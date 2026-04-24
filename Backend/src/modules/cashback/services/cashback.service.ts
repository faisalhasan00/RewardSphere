import { CashbackRepository } from '../repositories/cashback.repository';
import { WalletService } from '../../wallet/services/wallet.service';
import { ConversionStatus, Conversion } from '@prisma/client';
import { MoneyUtil } from '../../../core/utils/money';
import { AppError } from '../../../core/errors/AppError';
import { logger } from '../../../core/logger';
import { redis } from '../../../core/db/redis';
import { ReferralService } from '../../referral/services/referral.service';

export class CashbackService {
  constructor(
    private readonly cashbackRepository: CashbackRepository,
    private readonly walletService: WalletService,
    private readonly referralService: ReferralService
  ) {}

  /**
   * Records a new conversion from the tracking postback.
   * Calculates the user's share (30%) and rounds down.
   */
  async recordNewConversion(data: {
    clickId: string;
    userId: string;
    storeId: string;
    networkId: string;
    networkTransactionId: string;
    networkCommission: bigint; // Full commission from network in paise
    orderAmount: bigint;
    status: ConversionStatus;
    payableAt?: Date;
  }): Promise<Conversion> {
    const userCashback = MoneyUtil.calculateUserCashback(data.networkCommission);

    logger.info(`Recording conversion: Network payout ${data.networkCommission} -> User share ${userCashback}`);

    return this.cashbackRepository.create({
      ...data,
      cashbackAmount: userCashback, // Storing user share for display/credit
    } as any); // BaseRepository needs better type handling for BigInt sometimes
  }

  /**
   * Manually confirm or reject a conversion (Admin action or Network Update).
   */
  async updateStatus(id: string, newStatus: ConversionStatus): Promise<void> {
    const conversion = await this.cashbackRepository.findWithUser(id);
    if (!conversion) throw AppError.notFound('Conversion not found');

    const currentStatus = conversion.status;

    // Handle Transitions
    if (newStatus === ConversionStatus.REJECTED) {
      await this.handleRejection(conversion);
    } else if (newStatus === ConversionStatus.CONFIRMED && currentStatus === ConversionStatus.PENDING) {
      await this.cashbackRepository.updateStatusSecurely(id, ConversionStatus.PENDING, ConversionStatus.CONFIRMED);
    } else if (newStatus === ConversionStatus.CREDITED) {
      await this.creditToWallet(id);
    }
  }

  /**
   * Handles rejection and potential reversal.
   */
  private async handleRejection(conversion: Conversion): Promise<void> {
    if (conversion.status === ConversionStatus.CREDITED) {
      // Reversal logic
      await this.walletService.reverseCashback(
        conversion.userId,
        conversion.cashbackAmount,
        conversion.id,
        `Reversal for transaction ${conversion.networkTransactionId}`
      );
      await this.cashbackRepository.update(conversion.id, { 
        status: ConversionStatus.REVERSED 
      });
    } else {
      await this.cashbackRepository.update(conversion.id, { 
        status: ConversionStatus.REJECTED 
      });
    }
  }

  /**
   * Moves a CONFIRMED conversion to CREDITED and adds money to wallet.
   * Atomically ensures it's only done once.
   */
  async creditToWallet(id: string): Promise<void> {
    const conversion = await this.cashbackRepository.findWithUser(id);
    if (!conversion) throw AppError.notFound('Conversion not found');

    if (conversion.status !== ConversionStatus.CONFIRMED) {
      throw AppError.badRequest(`Cannot credit conversion in ${conversion.status} status`);
    }

    // Atomically shift status to prevent double-crediting
    const updated = await this.cashbackRepository.updateStatusSecurely(
      id, 
      ConversionStatus.CONFIRMED, 
      ConversionStatus.CREDITED,
      { creditedAt: new Date() }
    );

    if (!updated) {
      logger.warn(`Conversion ${id} already processed or status changed. Skipping wallet credit.`);
      return;
    }

    // Money Move
    await this.walletService.creditCashback(
      conversion.userId,
      conversion.cashbackAmount,
      conversion.id,
      `Cashback for order ${conversion.networkTransactionId}`
    );

    // 2. Trigger Referral Milestone Check
    await this.referralService.triggerFirstPurchaseReward(conversion.userId, conversion.id);
  }

  /**
   * Batch process confirmations for matured conversions.
   * Runs in batches to prevent memory/transaction overflow.
   */
  async processPendingConfirmations(batchSize: number = 20): Promise<number> {
    // Distributed lock to prevent double execution
    const lockKey = 'lock:batch:confirmations';
    const lockAcquired = await redis.set(lockKey, 'locked', 'EX', 300, 'NX');
    if (!lockAcquired) {
      logger.info('Batch confirmation job already running. Skipping.');
      return 0;
    }

    try {
      const matured = await this.cashbackRepository.findMaturedPending(batchSize);
      logger.info(`Found ${matured.length} matured conversions to credit.`);

      let successCount = 0;
      for (const conv of matured) {
        try {
          await this.creditToWallet(conv.id);
          successCount++;
        } catch (err) {
          logger.error(`Failed to credit conversion ${conv.id}:`, err);
        }
      }

      return successCount;
    } finally {
      await redis.del(lockKey);
    }
  }
}
