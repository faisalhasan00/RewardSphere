import { PrismaClient, Referral, TransactionType } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class ReferralRepository extends BaseRepository<Referral> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.referral);
  }

  /**
   * Find referral record for a referred user.
   */
  async findByReferredId(referredId: string): Promise<Referral | null> {
    return this.prisma.referral.findUnique({
      where: { referredId }
    });
  }

  /**
   * Atomic Reward Payout:
   * 1. Marks Referral as isRewarded.
   * 2. Adds bonus to Referrer's Wallet.
   * 3. Creates WalletTransaction audit log.
   */
  async processReward(referralId: string, amount: bigint, conversionId: string): Promise<Referral> {
    return this.prisma.$transaction(async (tx) => {
      const referral = await tx.referral.findUnique({
        where: { id: referralId }
      });

      if (!referral) throw new Error('Referral record not found');
      if (referral.isRewarded) throw new Error('Referral already rewarded');

      // 1. Update Referral record
      const updated = await tx.referral.update({
        where: { id: referralId },
        data: {
          isRewarded: true,
          rewardedAt: new Date(),
          bonusAmount: amount,
          firstConversionId: conversionId
        }
      });

      // 2. Create Wallet Transaction for Referrer
      await tx.walletTransaction.create({
        data: {
          userId: referral.referrerId,
          amount: amount,
          type: TransactionType.REFERRAL_BONUS,
          description: `Referral bonus for inviting user ${referral.referredId.substring(0, 8)}`,
          referralId: referral.id
        }
      });

      // 3. Update Referrer Wallet Balance
      await tx.wallet.update({
        where: { userId: referral.referrerId },
        data: {
          balance: {
            increment: amount
          }
        }
      });

      return updated;
    });
  }

  /**
   * Get stats for a referrer.
   */
  async getReferrerStats(userId: string) {
    const [totalInvited, totalRewarded, totalEarned] = await Promise.all([
      this.prisma.referral.count({ where: { referrerId: userId } }),
      this.prisma.referral.count({ where: { referrerId: userId, isRewarded: true } }),
      this.prisma.referral.aggregate({
        where: { referrerId: userId, isRewarded: true },
        _sum: { bonusAmount: true }
      })
    ]);

    return {
      totalInvited,
      totalRewarded,
      totalEarned: totalEarned._sum.bonusAmount || 0n
    };
  }
}
