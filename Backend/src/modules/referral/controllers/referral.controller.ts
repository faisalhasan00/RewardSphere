import { Request, Response } from 'express';
import { ReferralService } from '../services/referral.service';
import { logger } from '../../../core/logger';

export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  /**
   * Returns referral stats for the logged-in user.
   */
  async getMyStats(req: Request, res: Response) {
    const user = (req as any).user;
    const stats = await this.referralService.getStats(user.id);

    res.json({
      success: true,
      data: {
        referralCode: user.referralCode,
        totalInvited: stats.totalInvited,
        totalRewarded: stats.totalRewarded,
        totalEarned: stats.totalEarned.toString(), // Standard BigInt handling
        inviteLink: `https://grabon.com/join?ref=${user.referralCode}` // Example link
      }
    });
  }
}
