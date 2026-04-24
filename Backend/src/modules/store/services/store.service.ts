import { Store } from '@prisma/client';
import { BaseService } from '../../../core/base/BaseService';
import { StoreRepository } from '../repositories/store.repository';
import { AppError, HttpCode } from '../../../core/errors/AppError';
import { CacheService, CacheTTL } from '../../../core/services/cache.service';

export class StoreService extends BaseService<Store> {
  constructor(
    private storeRepository: StoreRepository,
    private cacheService: CacheService
  ) {
    super(storeRepository);
  }

  async getAllStores(): Promise<Store[]> {
    const cacheKey = 'stores:all';
    const cached = await this.cacheService.get<Store[]>(cacheKey);
    if (cached) return cached;

    const stores = await this.storeRepository.findAll();
    await this.cacheService.set(cacheKey, stores, CacheTTL.STORE_LISTING);
    return stores;
  }

  async getBySlug(slug: string): Promise<Store> {
    const cacheKey = `store:slug:${slug}`;
    const cached = await this.cacheService.get<Store>(cacheKey);
    if (cached) return cached;

    const store = await this.storeRepository.findBySlug(slug);
    if (!store) {
      throw new AppError('StoreNotFound', HttpCode.NOT_FOUND, `Store with slug ${slug} not found`, true);
    }
    
    await this.cacheService.set(cacheKey, store, CacheTTL.STORE_LISTING);
    return store;
  }

  async getFeaturedStores(): Promise<Store[]> {
    const cacheKey = 'stores:featured';
    const cached = await this.cacheService.get<Store[]>(cacheKey);
    if (cached) return cached;

    const stores = await this.storeRepository.findFeatured();
    await this.cacheService.set(cacheKey, stores, CacheTTL.STORE_LISTING);
    return stores;
  }

  // Admin Overrides & Cache Invalidation
  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    const store = await this.storeRepository.update(id, data);
    
    // Invalidate caches
    await this.cacheService.del('stores:all');
    await this.cacheService.del('stores:featured');
    await this.cacheService.del(`store:slug:${store.slug}`);
    
    return store;
  }
}
