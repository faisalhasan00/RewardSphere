import { Request, Response, NextFunction } from 'express';
import { StoreService } from '../services/store.service';
import { HttpCode } from '../../../core/errors/AppError';

export class StoreController {
  constructor(private storeService: StoreService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stores = await this.storeService.getAllStores();
      res.status(HttpCode.OK).json({ status: 'success', data: stores });
    } catch (error) {
      next(error);
    }
  };

  public getFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stores = await this.storeService.getFeaturedStores();
      res.status(HttpCode.OK).json({ status: 'success', data: stores });
    } catch (error) {
      next(error);
    }
  };

  public getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await this.storeService.getBySlug(req.params.slug as string);
      res.status(HttpCode.OK).json({ status: 'success', data: store });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await this.storeService.create(req.body);
      res.status(HttpCode.CREATED).json({ status: 'success', data: store });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await this.storeService.updateStore(req.params.id as string, req.body);
      res.status(HttpCode.OK).json({ status: 'success', data: store });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.storeService.delete(req.params.id as string);
      res.status(HttpCode.OK).json({ status: 'success', message: 'Store deleted' });
    } catch (error) {
      next(error);
    }
  };
}
