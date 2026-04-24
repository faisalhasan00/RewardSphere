import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '@prisma/client';
import { AuthRepository } from '../repositories/auth.repository';
import { config } from '../../../config';
import { AppError, HttpCode } from '../../../core/errors/AppError';
import { IOTPProvider } from '../../../core/services/otp.provider';
import { logger } from '../../../core/logger';
import { ReferralService } from '../../referral/services/referral.service';

import { OAuth2Client } from 'google-auth-library';

export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private authRepository: AuthRepository,
    private otpProvider: IOTPProvider,
    private referralService: ReferralService
  ) {
    this.googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);
  }

  private generateToken(id: string): string {
    return jwt.sign({ id }, config.JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  private generateRefreshToken(): string {
    return crypto.randomUUID();
  }

  async signup(data: any): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError('UserExists', HttpCode.BAD_REQUEST, 'User with this email already exists', true);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    // Generate referral code if doesn't exist
    const referralCode = crypto.randomUUID().substring(0, 8).toUpperCase();

    // 1. Process Referral before creation if code provided
    let referrerId: string | undefined;
    if (data.referralCode) {
      const referrer = await this.authRepository.findByReferralCode(data.referralCode);
      if (referrer) {
        referrerId = referrer.id;
      } else {
        logger.warn(`Invalid referral code used: ${data.referralCode}`);
      }
    }

    const user = await this.authRepository.create({
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      name: data.name,
      referralCode,
      referrerId, // Link to referrer
    });

    // 2. Initialize the Referral record if referrer exists
    if (referrerId) {
      await this.referralService.linkReferredUser(user.id, referrerId);
    }

    // Handle OTP request immediately
    await this.requestOTP(user.phone as string);

    return user;
  }

  async login(data: any): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.findByEmail(data.email);
    
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      if (user) await this.authRepository.incrementLoginAttempts(user.id);
      throw new AppError('InvalidCredentials', HttpCode.UNAUTHORIZED, 'Invalid email or password', true);
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new AppError('AccountLocked', HttpCode.BAD_REQUEST, 'Account is temporarily locked', true);
    }

    const accessToken = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken();

    // Hash refresh token before saving
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.update(user.id, { 
      refreshToken: hashedRefreshToken,
      loginAttempts: 0,
      lockUntil: null 
    });

    return { user, accessToken, refreshToken };
  }

  async requestOTP(phone: string): Promise<void> {
    const user = await this.authRepository.findByPhone(phone);
    if (!user) throw new AppError('UserNotFound', HttpCode.NOT_FOUND, 'User not found', true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await this.authRepository.update(user.id, {
      otpCode: hashedOtp,
      otpExpiry: expiry
    });

    await this.otpProvider.sendOTP(phone, otp);
  }

  async verifyOTP(phone: string, otp: string): Promise<boolean> {
    const user = await this.authRepository.findByPhone(phone);
    if (!user || !user.otpCode || !user.otpExpiry) {
      throw new AppError('InvalidOTP', HttpCode.BAD_REQUEST, 'No pending OTP found', true);
    }

    if (user.otpExpiry < new Date()) {
      throw new AppError('OTPExpired', HttpCode.BAD_REQUEST, 'OTP has expired', true);
    }

    const isValid = await bcrypt.compare(otp, user.otpCode);
    if (!isValid) {
      throw new AppError('InvalidOTP', HttpCode.BAD_REQUEST, 'Invalid OTP', true);
    }

    await this.authRepository.update(user.id, {
      isPhoneVerified: true,
      otpCode: null,
      otpExpiry: null
    });

    return true;
  }

  async googleLogin(idToken: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new AppError('GoogleAuthError', HttpCode.BAD_REQUEST, 'Email not provided by Google', true);
    }

    let user = await this.authRepository.findByEmail(payload.email);

    if (!user) {
      // Create new user for social signup
      const referralCode = crypto.randomUUID().substring(0, 8).toUpperCase();
      user = await this.authRepository.create({
        email: payload.email,
        name: payload.name || 'Google User',
        password: crypto.randomBytes(32).toString('hex'), // Secure random password
        referralCode,
        isPhoneVerified: true, // Google verified emails are often trusted
      });
      logger.info(`New user registered via Google: ${payload.email}`);
    }

    const accessToken = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.authRepository.update(user.id, { 
      refreshToken: hashedRefreshToken,
      loginAttempts: 0 
    });

    return { user, accessToken, refreshToken };
  }
}
