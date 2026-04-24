import { PrismaClient, Category } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.category);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  async findMainCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({ where: { parentId: null } });
  }

  async findWithChildren(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: { children: true },
      where: { parentId: null },
    });
  }
}
