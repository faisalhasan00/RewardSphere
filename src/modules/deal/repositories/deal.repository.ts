import { PrismaClient, Deal, Prisma } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class DealRepository extends BaseRepository<Deal> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.deal);
  }

  async findDeals(params: {
    skip: number;
    take: number;
    where: Prisma.DealWhereInput;
    orderBy: Prisma.DealOrderByWithRelationInput[];
  }) {
    const [total, items] = await Promise.all([
      this.prisma.deal.count({ where: params.where }),
      this.prisma.deal.findMany({
        where: params.where,
        skip: params.skip,
        take: params.take,
        orderBy: params.orderBy,
        include: {
          store: {
            select: {
              name: true,
              slug: true,
              logoUrl: true,
            },
          },
        },
      }),
    ]);

    return { total, items };
  }

  async findByStore(storeId: string): Promise<Deal[]> {
    return this.prisma.deal.findMany({
      where: { storeId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

}
