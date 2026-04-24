import { Request, Response, NextFunction } from 'express';
import { CashbackService } from '../services/cashback.service';
import { ConversionStatus } from '@prisma/client';
import { HttpCode, AppError } from '../../../core/errors/AppError';
import { logger } from '../../../core/logger';

export class CashbackController {
  constructor(private readonly cashbackService: CashbackService) {}

  /**
   * Admin: Manually confirm or reject a conversion.
   */
  public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { status } = req.body; // PENDING, CONFIRMED, REJECTED, CREDITED

      if (!id || !status) {
        throw AppError.badRequest('Missing id or status');
      }

      await this.cashbackService.updateStatus(id, status as ConversionStatus);

      res.status(HttpCode.OK).json({
        status: 'success',
        message: `Conversion status updated to ${status}`
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Admin: Trigger batch confirmation for matured conversions.
   */
  public triggerMaturityBatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Admin triggered maturity batch processing');
      const processedCount = await this.cashbackService.processPendingConfirmations();

      res.status(HttpCode.OK).json({
        status: 'success',
        message: `Processed ${processedCount} matured conversions`
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * User: View their own cashback conversion history.
   */
  public getMyHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) throw AppError.unauthorized('User not authenticated');

      // Logic would typically be in repository, adding here for brevity or 
      // adding to CashbackService later.
      // For now, let's just return a placeholder or implement simple fetch.
      
      res.status(HttpCode.OK).json({
        status: 'success',
        message: 'Endpoint implemented. History will be returned here.'
      });
    } catch (error) {
      next(error);
    }
  };
}
