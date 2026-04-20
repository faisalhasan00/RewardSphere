import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10),
    name: z.string().optional(),
    referralCode: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string(),
    otp: z.string().length(6),
  }),
});

export const requestOtpSchema = z.object({
  body: z.object({
    phone: z.string(),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export type SignupDto = z.infer<typeof signupSchema>['body'];
export type LoginDto = z.infer<typeof loginSchema>['body'];
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>['body'];
