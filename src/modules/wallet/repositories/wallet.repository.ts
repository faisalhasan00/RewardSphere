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
}
