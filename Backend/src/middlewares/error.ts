import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../core/errors/AppError';
import { logger } from '../core/logger';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    logger.error(`[${error.name}] ${error.message}`);
    return res.status(error.httpCode).json({
      status: 'error',
      name: error.name,
      message: error.message,
    });
  }

  // Unhandled errors
  logger.error(`[Unexpected Error] ${error.message}`);
  logger.error(error.stack);

  return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
