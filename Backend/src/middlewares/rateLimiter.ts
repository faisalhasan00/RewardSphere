import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redis } from '../core/db/redis';
import { AppError, HttpCode } from '../core/errors/AppError';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (async (...args: string[]) => {
      const [command, ...rest] = args;
      return redis.call(command as string, ...rest);
    }) as any,
  }),
  handler: (req, res, next) => {
    next(new AppError('TooManyRequests', HttpCode.BAD_REQUEST, 'Too many requests, please try again later.', true));
  },
});

// Stricter limiter for Auth routes (Login/Signup)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10, // 10 attempts per 15 minutes
  store: new RedisStore({
    sendCommand: (async (...args: string[]) => {
      const [command, ...rest] = args;
      return redis.call(command as string, ...rest);
    }) as any,
    prefix: 'rl:auth:',
  }),
  handler: (req, res, next) => {
    next(new AppError('AuthRateLimit', HttpCode.BAD_REQUEST, 'Too many login attempts. Please try again after 15 minutes.', true));
  },
});

// OTP request limiter
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 3, // Max 3 OTP requests per 10 mins
  store: new RedisStore({
    sendCommand: (async (...args: string[]) => {
      const [command, ...rest] = args;
      return redis.call(command as string, ...rest);
    }) as any,
    prefix: 'rl:otp:',
  }),
  skipSuccessfulRequests: false,
  handler: (req, res, next) => {
    next(new AppError('OTPRateLimit', HttpCode.BAD_REQUEST, 'Too many OTP requests. Please try again after 10 minutes.', true));
  },
});
