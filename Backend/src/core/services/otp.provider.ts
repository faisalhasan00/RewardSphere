import { logger } from '../logger';

export interface IOTPProvider {
  sendOTP(phone: string, otp: string): Promise<boolean>;
  verifyOTP(phone: string, otp: string): Promise<boolean>;
}

export class MockOTPProvider implements IOTPProvider {
  async sendOTP(phone: string, otp: string): Promise<boolean> {
    // In a real implementation, call Twilio, MSG91, etc.
    logger.info(`[MockOTPProvider] Sending OTP ${otp} to ${phone}`);
    return true;
  }

  async verifyOTP(phone: string, otp: string): Promise<boolean> {
    logger.info(`[MockOTPProvider] Verifying OTP ${otp} for ${phone}`);
    return true;
  }
}
