import { Deal, Prisma } from '@prisma/client';
import { BaseService } from '../../../core/base/BaseService';
import { DealRepository } from '../repositories/deal.repository';
import { CacheService, CacheTTL } from '../../../core/services/cache.service';

export class DealService extends BaseService<Deal> {
  constructor(
    private dealRepository: DealRepository,
    private cacheService: CacheService
  ) {
    super(dealRepository);
  }

  async getFilteredDeals(filters: any) {
    const { page, limit, storeId, categoryId, isFeatured, isTrending, sort } = filters;
    
    // Cache Key Generation
    const cacheKey = `deals:list:${JSON.stringify(filters)}`;
    const cachedData = await this.cacheService.get<any>(cacheKey);
    if (cachedData) return cachedData;

    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.DealWhereInput = { isActive: true };
    if (storeId) where.storeId = storeId;
    if (isFeatured) where.isFeatured = true;
    
    if (categoryId) {
      where.store = { categoryId };
    }

    if (isTrending) {
      where.isTrendingOverride = true;
    }

    const orderBy: Prisma.DealOrderByWithRelationInput[] = [];
    if (sort === 'cashback') {
      orderBy.push({ cashbackValue: 'desc' });
    } else if (sort === 'trending') {
      orderBy.push({ isTrendingOverride: 'desc' });
    } else {
      orderBy.push({ createdAt: 'desc' });
    }

    const result = await this.dealRepository.findDeals({ skip, take, where, orderBy });
    
    // Cache for 5 mins
    await this.cacheService.set(cacheKey, result, CacheTTL.DEAL_LISTING);
    
    return result;
  }

  async getDealDetails(id: string): Promise<Deal> {
    const cacheKey = `deal:detail:${id}`;
    const cached = await this.cacheService.get<Deal>(cacheKey);
    if (cached) return cached;

    const deal = await this.dealRepository.findById(id);
    if (deal) {
      await this.cacheService.set(cacheKey, deal, CacheTTL.DEAL_SINGLE);
    }
    return deal as Deal;
  }

  // Admin Overrides & Cache Invalidation
  async updateDeal(id: string, data: Partial<Deal>): Promise<Deal> {
    const deal = await this.dealRepository.update(id, data);
    
    // Invalidate caches
    await this.cacheService.del(`deal:detail:${id}`);
    await this.cacheService.invalidatePattern('deals:list:*');
    
    return deal;
  }

  async deleteDeal(id: string): Promise<void> {
    await this.dealRepository.delete(id);
    await this.cacheService.del(`deal:detail:${id}`);
    await this.cacheService.invalidatePattern('deals:list:*');
  }
}
