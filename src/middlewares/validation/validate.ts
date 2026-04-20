import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError, HttpCode } from '../../core/errors/AppError';

export const validate = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(new AppError('ValidationError', HttpCode.BAD_REQUEST, error.errors ? JSON.stringify(error.errors) : error.message, true));
    }
  };
};
