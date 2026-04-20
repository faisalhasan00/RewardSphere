import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { HttpCode } from '../../../core/errors/AppError';

export class AuthController {
  constructor(private authService: AuthService) {}

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.signup(req.body);
      res.status(HttpCode.CREATED).json({
        status: 'success',
        message: 'Signup successful. Please verify your phone.',
        data: { user: { id: user.id, email: user.email, phone: user.phone } },
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.login(req.body);
      res.status(HttpCode.OK).json({
        status: 'success',
        data: {
          user: { id: user.id, email: user.email, name: user.name },
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.verifyOTP(req.body.phone, req.body.otp);
      res.status(HttpCode.OK).json({
        status: 'success',
        message: 'Phone verified successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public requestOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.requestOTP(req.body.phone);
      res.status(HttpCode.OK).json({
        status: 'success',
        message: 'OTP sent successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
