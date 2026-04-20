import { Category } from '@prisma/client';
import { BaseService } from '../../../core/base/BaseService';
import { CategoryRepository } from '../repositories/category.repository';
import { AppError, HttpCode } from '../../../core/errors/AppError';

export class CategoryService extends BaseService<Category> {
  constructor(private categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }

  async getBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findBySlug(slug);
    if (!category) {
      throw new AppError('CategoryNotFound', HttpCode.NOT_FOUND, `Category with slug ${slug} not found`, true);
    }
    return category;
  }

  async getHierarchy(): Promise<Category[]> {
    return this.categoryRepository.findWithChildren();
  }
}
