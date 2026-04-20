import { PrismaClient, Store } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class StoreRepository extends BaseRepository<Store> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.store);
  }

  async findBySlug(slug: string): Promise<Store | null> {
    return this.prisma.store.findUnique({ where: { slug } });
  }

  async findActive(): Promise<Store[]> {
    return this.prisma.store.findMany({ where: { isActive: true } });
  }

  async findFeatured(): Promise<Store[]> {
    return this.prisma.store.findMany({ where: { isFeatured: true, isActive: true } });
  }

  async findByCategory(categoryId: string): Promise<Store[]> {
    return this.prisma.store.findMany({ where: { categoryId, isActive: true } });
  }
}
