import { WithdrawalRepository } from '../repositories/withdrawal.repository';
import { WalletService } from './wallet.service';
import { Withdrawal, WithdrawalStatus } from '@prisma/client';
import { AppError } from '../../../core/errors/AppError';
import { logger } from '../../../core/logger';

export class WithdrawalService {
  private readonly MIN_WITHDRAWAL_PAISE = 10000n; // ₹100

  constructor(
    private readonly withdrawalRepository: WithdrawalRepository,
    private readonly walletService: WalletService
  ) {}

  /**
   * User requests a UPI payout.
   */
  async requestPayout(userId: string, amountPaise: bigint, upiId: string): Promise<Withdrawal> {
    // 1. Minimum Limit Check
    if (amountPaise < this.MIN_WITHDRAWAL_PAISE) {
      throw AppError.badRequest(`Minimum withdrawal amount is ₹100 (${this.MIN_WITHDRAWAL_PAISE} paise)`);
    }

    // 2. Sufficient Balance Check
    const confirmedBalance = await this.walletService.getBalance(userId);
    if (confirmedBalance < amountPaise) {
      throw AppError.badRequest(`Insufficient confirmed balance. Available: ${confirmedBalance} paise`);
    }

    // 3. Fraud Check: UPI ID sharing
    const duplicateCount = await this.withdrawalRepository.findDuplicatePaymentDetails(userId, { upiId });
    if (duplicateCount > 0) {
      logger.warn(`Potential fraud detected: User ${userId} using UPI ID ${upiId} which is shared by other accounts.`);
      // We still allow it but could flag it or block it. For now, we block it to be safe.
      throw new AppError('Forbidden', 403, 'This UPI ID is already linked to another account. Please contact support.', true);
    }

    // 4. Create Withdrawal (Atomic)
    logger.info(`Processing withdrawal request for user ${userId}: ${amountPaise} paise`);
    return this.withdrawalRepository.createWithTransaction({
      userId,
      amount: amountPaise,
      method: 'UPI',
      paymentDetails: { upiId }
    });
  }

  /**
   * Admin approves and marks as paid.
   */
  async completePayout(id: string): Promise<Withdrawal> {
    const updated = await this.withdrawalRepository.update(id, {
      status: WithdrawalStatus.COMPLETED,
      processedAt: new Date()
    });
    logger.info(`Withdrawal ${id} marked as COMPLETED.`);
    return updated;
  }

  /**
   * Admin rejects and triggers refund.
   */
  async rejectPayout(id: string, reason: string): Promise<Withdrawal> {
    const withdrawal = await this.withdrawalRepository.rejectWithRefund(id, reason);
    logger.warn(`Withdrawal ${id} REJECTED. Reason: ${reason}. Refunded to user ${withdrawal.userId}.`);
    return withdrawal;
  }

  async getPendingWithdrawals(skip: number, take: number) {
    return this.withdrawalRepository.findPending(skip, take);
  }

  async getUserWithdrawals(userId: string) {
    return this.withdrawalRepository.findMany({ 
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
