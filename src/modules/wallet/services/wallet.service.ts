import { WalletRepository } from '../repositories/wallet.repository';
import { Wallet, WalletTransaction, TransactionType } from '@prisma/client';
import { AppError } from '../../../core/errors/AppError';
import { logger } from '../../../core/logger';

export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  /**
   * Retrieves the current balance for a user.
   */
  async getBalance(userId: string): Promise<bigint> {
    const wallet = await this.walletRepository.findByUserId(userId);
    return wallet?.balance || 0n;
  }

  /**
   * Post standard cashback to a wallet.
   * "Wallet transaction should only be created once per conversion"
   */
  async creditCashback(
    userId: string,
    amountPaise: bigint,
    conversionId: string,
    description: string = 'Cashback earned'
  ): Promise<WalletTransaction> {
    logger.info(`Crediting cashback to user ${userId}: ${amountPaise} paise for conversion ${conversionId}`);
    
    return this.walletRepository.updateBalanceWithTransaction(
      userId,
      amountPaise,
      TransactionType.CASHBACK,
      description,
      conversionId,
      { source: 'cashback_engine', timestamp: new Date() }
    );
  }

  /**
   * Performs a reversal for a previously credited conversion.
   * "Create a negative wallet transaction (reversal) and deduct from user balance"
   */
  async reverseCashback(
    userId: string,
    amountPaise: bigint,
    conversionId: string,
    description: string = 'Cashback reversal (rejected by network)'
  ): Promise<WalletTransaction> {
    logger.warn(`Reversing cashback for user ${userId}: -${amountPaise} paise for conversion ${conversionId}`);

    // Create a negative transaction to deduct from balance
    return this.walletRepository.updateBalanceWithTransaction(
      userId,
      -amountPaise, // Negative amount to decrement balance
      TransactionType.REVERSAL,
      description,
      conversionId,
      { source: 'reversal_engine', timestamp: new Date(), originalConversionId: conversionId }
    );
  }

  /**
   * Utility to add manual adjustments by admin.
   */
  async addAdjustment(
    userId: string,
    amountPaise: bigint,
    description: string,
    metadata?: any
  ): Promise<WalletTransaction> {
    return this.walletRepository.updateBalanceWithTransaction(
      userId,
      amountPaise,
      TransactionType.ADJUSTMENT,
      description,
      undefined,
      metadata
    );
  }
}
