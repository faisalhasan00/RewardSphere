import { Category } from '@prisma/client';
import { BaseService } from '../../../core/base/BaseService';
import { CategoryRepository } from '../repositories/category.repository';
import { AppError, HttpCode } from '../../../core/errors/AppError';
import { CacheService, CacheTTL } from '../../../core/services/cache.service';

export class CategoryService extends BaseService<Category> {
  constructor(
    private categoryRepository: CategoryRepository,
    private cacheService: CacheService
  ) {
    super(categoryRepository);
  }

  async getBySlug(slug: string): Promise<Category> {
    const cacheKey = `category:slug:${slug}`;
    const cached = await this.cacheService.get<Category>(cacheKey);
    if (cached) return cached;

    const category = await this.categoryRepository.findBySlug(slug);
    if (!category) {
      throw new AppError('CategoryNotFound', HttpCode.NOT_FOUND, `Category with slug ${slug} not found`, true);
    }
    
    await this.cacheService.set(cacheKey, category, CacheTTL.STORE_LISTING);
    return category;
  }

  async getHierarchy(): Promise<Category[]> {
    const cacheKey = 'categories:hierarchy';
    const cached = await this.cacheService.get<Category[]>(cacheKey);
    if (cached) return cached;

    const hierarchy = await this.categoryRepository.findWithChildren();
    await this.cacheService.set(cacheKey, hierarchy, CacheTTL.STORE_LISTING);
    return hierarchy;
  }
}
