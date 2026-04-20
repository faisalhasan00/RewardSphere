import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError, HttpCode } from '../core/errors/AppError';
import { prisma } from '../core/db/prisma';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Unauthorized', HttpCode.UNAUTHORIZED, 'You are not logged in', true);
    }

    // Verify token
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    // Check if user still exists
    const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!currentUser) {
      throw new AppError('UserNotFound', HttpCode.UNAUTHORIZED, 'The user belonging to this token no longer exists', true);
    }

    // Attach user to request
    req.user = currentUser;
    next();
  } catch (error) {
    next(new AppError('Unauthorized', HttpCode.UNAUTHORIZED, 'Invalid or expired token', true));
  }
};
