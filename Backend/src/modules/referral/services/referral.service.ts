import { ReferralRepository } from '../repositories/referral.repository';
import { AppError } from '../../../core/errors/AppError';
import { logger } from '../../../core/logger';

export class ReferralService {
  private readonly REFERRAL_BONUS_PAISE = 2500n; // ₹25

  constructor(private readonly referralRepository: ReferralRepository) {}

  /**
   * Links a new user to their referrer.
   * Called during registration.
   */
  async linkReferredUser(referredId: string, referrerId: string): Promise<void> {
    if (referredId === referrerId) {
      logger.warn(`Self-referral attempt blocked for user ${referredId}`);
      return;
    }

    await this.referralRepository.create({
      referrerId,
      referredId,
      bonusAmount: 0n, // Initial value
      isRewarded: false
    } as any);

    logger.info(`Linked new user ${referredId} to referrer ${referrerId}`);
  }

  /**
   * Triggers the reward if the user's first purchase milestone is reached.
   * Called by CashbackService when a conversion is CREDITED.
   */
  async triggerFirstPurchaseReward(userId: string, conversionId: string): Promise<void> {
    const referral = await this.referralRepository.findByReferredId(userId);
    
    // 1. Check if user was referred
    if (!referral) return;

    // 2. Check if already rewarded
    if (referral.isRewarded) return;

    // 3. Process Reward (Atomic)
    logger.info(`Determined user ${userId} milestone reached. Rewarding referrer ${referral.referrerId}`);
    try {
      await this.referralRepository.processReward(
        referral.id,
        this.REFERRAL_BONUS_PAISE,
        conversionId
      );
    } catch (err) {
      logger.error(`Failed to process referral reward for ${referral.id}:`, err);
    }
  }

  async getStats(userId: string) {
    return this.referralRepository.getReferrerStats(userId);
  }
}
