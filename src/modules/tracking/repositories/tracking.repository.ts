import { PrismaClient, Click, Conversion, UnmatchedConversion } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class TrackingRepository extends BaseRepository<Click> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.click);
  }

  async createClick(data: {
    clickId: string;
    storeId: string;
    dealId?: string | undefined;
    userId?: string | undefined;
    sessionId?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    referrerUrl?: string | null | undefined;
  }): Promise<Click> {
    return this.prisma.click.create({
      data: {
        clickId: data.clickId,
        storeId: data.storeId,
        dealId: data.dealId || null,
        userId: data.userId || null,
        sessionId: data.sessionId || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        referrerUrl: data.referrerUrl || null,
      },
    });
  }

  async findClickBySubId(clickId: string): Promise<Click | null> {
    return this.prisma.click.findUnique({
      where: { clickId },
    });
  }

  /**
   * Links past anonymous clicks (within a 7-day window) to a newly registered/logged-in user.
   */
  async linkGuestClicks(sessionId: string, userId: string, thresholdDays: number = 7): Promise<number> {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - thresholdDays);

    const result = await this.prisma.click.updateMany({
      where: {
        sessionId,
        userId: null,
        createdAt: {
          gte: thresholdDate,
        },
      },
      data: {
        userId,
      },
    });

    return result.count;
  }

  async upsertConversion(
    data: {
      clickId: string;
      userId: string;
      storeId: string;
      networkId: string;
      networkTransactionId: string;
      orderAmount: bigint;
      networkCommission: bigint;
      cashbackAmount: bigint;
      status: any;
      payableAt?: Date | null;
    }
  ): Promise<Conversion> {
    return this.prisma.conversion.upsert({
      where: {
        networkId_networkTransactionId: {
          networkId: data.networkId,
          networkTransactionId: data.networkTransactionId,
        },
      },
      update: {
        status: data.status,
        orderAmount: data.orderAmount,
        networkCommission: data.networkCommission,
        cashbackAmount: data.cashbackAmount,
        ...(data.payableAt ? { payableAt: data.payableAt } : {}),
      },
      create: {
        clickId: data.clickId,
        userId: data.userId,
        storeId: data.storeId,
        networkId: data.networkId,
        networkTransactionId: data.networkTransactionId,
        orderAmount: data.orderAmount,
        networkCommission: data.networkCommission,
        cashbackAmount: data.cashbackAmount,
        status: data.status,
        payableAt: data.payableAt || null,
      },
    });
  }

  async saveUnmatchedConversion(data: {
    networkId: string;
    networkTransactionId: string;
    clickId?: string;
    payload: any;
    status?: string;
  }): Promise<UnmatchedConversion> {
    return this.prisma.unmatchedConversion.create({
      data: {
        networkId: data.networkId,
        networkTransactionId: data.networkTransactionId,
        clickId: data.clickId || null,
        payload: data.payload,
        ...(data.status ? { status: data.status } : {}),
      },
    });
  }

  async getUnmatchedConversionCount(networkTransactionId: string): Promise<number> {
    return this.prisma.unmatchedConversion.count({
      where: { networkTransactionId }
    });
  }
}
