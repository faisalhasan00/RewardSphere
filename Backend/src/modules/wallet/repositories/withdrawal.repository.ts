import { PrismaClient, Withdrawal, WithdrawalStatus, TransactionType, Prisma } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class WithdrawalRepository extends BaseRepository<Withdrawal> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.withdrawal);
  }

  /**
   * Atomic Withdrawal Request:
   * 1. Creates Withdrawal record.
   * 2. Creates WalletTransaction (Deduction).
   * 3. Decrements Wallet balance.
   */
  async createWithTransaction(data: {
    userId: string;
    amount: bigint;
    method: string;
    paymentDetails: any;
  }): Promise<Withdrawal> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create the Withdrawal record
      const withdrawal = await tx.withdrawal.create({
        data: {
          userId: data.userId,
          amount: data.amount,
          method: data.method,
          paymentDetails: data.paymentDetails,
          status: WithdrawalStatus.PENDING,
        },
      });

      // 2. Create the WalletTransaction (Deduction)
      await tx.walletTransaction.create({
        data: {
          userId: data.userId,
          amount: -data.amount, // Negative for deduction
          type: TransactionType.WITHDRAWAL,
          description: `Withdrawal request #${withdrawal.id.substring(0, 8)}`,
          withdrawalId: withdrawal.id,
        },
      });

      // 3. Update the Wallet balance
      await tx.wallet.update({
        where: { userId: data.userId },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      });

      return withdrawal;
    });
  }

  /**
   * Rejects a withdrawal and refunds the money to the user's wallet.
   */
  async rejectWithRefund(id: string, reason: string): Promise<Withdrawal> {
    return this.prisma.$transaction(async (tx) => {
      const withdrawal = await tx.withdrawal.findUnique({
        where: { id },
        include: { user: { include: { wallet: true } } }
      });

      if (!withdrawal) throw new Error('Withdrawal not found');
      if (withdrawal.status !== WithdrawalStatus.PENDING && withdrawal.status !== WithdrawalStatus.PROCESSING) {
        throw new Error('Can only reject pending or processing withdrawals');
      }

      // 1. Update Withdrawal status
      const updated = await tx.withdrawal.update({
        where: { id },
        data: {
          status: WithdrawalStatus.REJECTED,
          rejectionReason: reason,
        },
      });

      // 2. Create Refund Transaction
      await tx.walletTransaction.create({
        data: {
          userId: withdrawal.userId,
          amount: withdrawal.amount, // Positive for refund
          type: TransactionType.ADJUSTMENT,
          description: `Refund for rejected withdrawal #${id.substring(0, 8)}`,
          metadata: { rejectionReason: reason, sourceWithdrawalId: id }
        },
      });

      // 3. Increment Wallet balance
      await tx.wallet.update({
        where: { userId: withdrawal.userId },
        data: {
          balance: {
            increment: withdrawal.amount,
          },
        },
      });

      return updated;
    });
  }

  /**
   * Fraud Check: Find if this payment detail is used by other accounts.
   */
  async findDuplicatePaymentDetails(userId: string, paymentDetails: any): Promise<number> {
    const upiId = paymentDetails.upiId;
    if (!upiId) return 0;

    return this.prisma.withdrawal.count({
      where: {
        userId: { not: userId },
        paymentDetails: {
          path: ['upiId'],
          equals: upiId
        }
      }
    });
  }

  async findPending(skip: number = 0, take: number = 20) {
    return this.prisma.withdrawal.findMany({
      where: { status: WithdrawalStatus.PENDING },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } }
      }
    });
  }
}
