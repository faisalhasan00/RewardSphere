import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '@prisma/client';
import { AuthRepository } from '../repositories/auth.repository';
import { config } from '../../../config';
import { AppError, HttpCode } from '../../../core/errors/AppError';
import { IOTPProvider } from '../../../core/services/otp.provider';

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private otpProvider: IOTPProvider
  ) {}

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

    const user = await this.authRepository.create({
      ...data,
      password: hashedPassword,
      referralCode,
    });

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
}
