import { Request, Response, NextFunction } from 'express';
import { DealService } from '../services/deal.service';
import { HttpCode } from '../../../core/errors/AppError';

export class DealController {
  constructor(private dealService: DealService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.dealService.getFilteredDeals(req.query);
      res.status(HttpCode.OK).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deal = await this.dealService.getDealDetails(req.params.id as string);
      res.status(HttpCode.OK).json({ status: 'success', data: deal });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deal = await this.dealService.create(req.body);
      res.status(HttpCode.CREATED).json({ status: 'success', data: deal });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deal = await this.dealService.updateDeal(req.params.id as string, req.body);
      res.status(HttpCode.OK).json({ status: 'success', data: deal });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.dealService.deleteDeal(req.params.id as string);
      res.status(HttpCode.OK).json({ status: 'success', message: 'Deal deleted' });
    } catch (error) {
      next(error);
    }
  };
}
