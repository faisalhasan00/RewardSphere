import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';
import { HttpCode, AppError } from '../errors/AppError';
import { logger } from '../logger';

export const validateRequest = (
  schema: ZodSchema<any>,
  source: 'body' | 'query' | 'params' | 'cookies' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        
        logger.warn(`Validation Error [${req.method} ${req.originalUrl}]:`, errorMessages);

        res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          message: 'Invalid request data',
          details: errorMessages,
        });
      } else {
        next(error);
      }
    }
  };
};
