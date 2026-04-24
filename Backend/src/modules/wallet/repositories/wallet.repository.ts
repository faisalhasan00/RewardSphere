import { PrismaClient, Wallet, WalletTransaction, TransactionType } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class WalletRepository extends BaseRepository<Wallet> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.wallet);
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: { userId },
    });
  }

  /**
   * Atomically updates user balance and creates a transaction record.
   * Uses Prisma transaction to ensure consistency.
   */
  async updateBalanceWithTransaction(
    userId: string,
    amountPaise: bigint,
    type: TransactionType,
    description: string,
    conversionId?: string,
    metadata?: any
  ): Promise<WalletTransaction> {
    const [transaction] = await this.prisma.$transaction([
      // 1. Create the wallet transaction record
      this.prisma.walletTransaction.create({
        data: {
          userId,
          amount: amountPaise,
          type,
          description,
          conversionId: conversionId || null,
          metadata: metadata || null,
        },
      }),
      // 2. Upsert the wallet and update balance
      this.prisma.wallet.upsert({
        where: { userId },
        update: {
          balance: {
            increment: amountPaise,
          },
        },
        create: {
          userId,
          balance: amountPaise,
        },
      }),
    ]);

    return transaction as WalletTransaction;
  }

  /**
   * Calculates tiered balances:
   * - Confirmed: Actual wallet balance (ready to withdraw)
   * - Pending: Sum of all PENDING/CONFIRMED conversions not yet credited
   */
  async getTieredBalances(userId: string): Promise<{ confirmed: bigint; pending: bigint }> {
    const [wallet, pendingResult] = await Promise.all([
      this.findByUserId(userId),
      this.prisma.conversion.aggregate({
        where: {
          userId,
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
        _sum: {
          cashbackAmount: true,
        },
      }),
    ]);

    return {
      confirmed: wallet?.balance || 0n,
      pending: pendingResult._sum.cashbackAmount || 0n,
    };
  }

  /**
   * Fetches paginated transaction history for a user.
   */
  async getTransactionHistory(userId: string, skip: number = 0, take: number = 20) {
    const [total, items] = await Promise.all([
      this.prisma.walletTransaction.count({ where: { userId } }),
      this.prisma.walletTransaction.findMany({
        where: { userId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          conversion: {
            select: {
              store: { select: { name: true } },
              networkTransactionId: true,
            },
          },
        },
      }),
    ]);

    return { total, items };
  }
}
