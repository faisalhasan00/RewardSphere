import { PrismaClient, Conversion, ConversionStatus, Prisma } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class CashbackRepository extends BaseRepository<Conversion> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.conversion);
  }

  async findWithUser(id: string): Promise<(Conversion & { user: { id: string } }) | null> {
    return this.prisma.conversion.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true }
        }
      }
    }) as any;
  }

  /**
   * Finds pending conversions that have passed their waiting period (payableAt).
   * Limit ensures we don't overwhelm the system in one batch.
   */
  async findMaturedPending(batchSize: number = 50): Promise<Conversion[]> {
    return this.prisma.conversion.findMany({
      where: {
        status: ConversionStatus.CONFIRMED, // Only confirmed ones should move to CREDITED
        payableAt: {
          lte: new Date(),
        },
      },
      take: batchSize,
      orderBy: { payableAt: 'asc' },
    });
  }

  /**
   * Atomic status update with condition to prevent race conditions.
   */
  async updateStatusSecurely(
    id: string,
    expectedStatus: ConversionStatus,
    newStatus: ConversionStatus,
    extraData?: Prisma.ConversionUpdateInput
  ): Promise<Conversion | null> {
    try {
      return await this.prisma.conversion.update({
        where: { 
          id,
          status: expectedStatus // Force validation of current state
        },
        data: {
          status: newStatus,
          ...extraData
        },
      });
    } catch (error) {
      // If P2025 (Record not found), it means the status was already changed by another process
      return null;
    }
  }

  /**
   * Finds all conversions with status PENDING for admin review or monitoring.
   */
  async findInProgress(skip: number, take: number) {
    return this.prisma.conversion.findMany({
      where: {
        status: {
          in: [ConversionStatus.PENDING, ConversionStatus.CONFIRMED]
        }
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    });
  }
}
