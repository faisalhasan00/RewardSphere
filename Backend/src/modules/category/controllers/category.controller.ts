import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { HttpCode } from '../../../core/errors/AppError';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.findAll();
      res.status(HttpCode.OK).json({ status: 'success', data: categories });
    } catch (error) {
      next(error);
    }
  };

  public getHierarchy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hierarchy = await this.categoryService.getHierarchy();
      res.status(HttpCode.OK).json({ status: 'success', data: hierarchy });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.create(req.body);
      res.status(HttpCode.CREATED).json({ status: 'success', data: category });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.update(req.params.id as string, req.body);
      res.status(HttpCode.OK).json({ status: 'success', data: category });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.delete(req.params.id as string);
      res.status(HttpCode.OK).json({ status: 'success', message: 'Category deleted' });
    } catch (error) {
      next(error);
    }
  };
}
