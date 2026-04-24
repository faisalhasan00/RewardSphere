import { Request, Response } from 'express';
import { WithdrawalService } from '../services/withdrawal.service';
import { WalletService } from '../services/wallet.service';
import { logger } from '../../../core/logger';
import { AppError } from '../../../core/errors/AppError';

export class WithdrawalController {
  constructor(
    private readonly withdrawalService: WithdrawalService,
    private readonly walletService: WalletService
  ) {}

  /**
   * Returns user's balance dashboard and recent history.
   */
  async getDashboard(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const [balances, history] = await Promise.all([
      this.walletService.getBalanceDashboard(userId),
      this.walletService.getHistory(userId, 0, 10)
    ]);

    res.json({
      success: true,
      data: {
        balances: {
          confirmed: balances.confirmed.toString(),
          pending: balances.pending.toString(),
        },
        recentTransactions: (history as any).items.map((t: any) => ({
          ...t,
          amount: t.amount.toString(),
        }))
      }
    });
  }

  /**
   * User submits a withdrawal request.
   */
  async requestWithdrawal(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const { amountPaise, upiId } = req.body;

    const withdrawal = await this.withdrawalService.requestPayout(
      userId, 
      BigInt(amountPaise), 
      upiId
    );

    res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      data: {
        id: withdrawal.id,
        amount: withdrawal.amount.toString(),
        status: withdrawal.status
      }
    });
  }

  /**
   * Admin: List pending withdrawals.
   */
  async adminListPending(req: Request, res: Response) {
    const skip = parseInt(String(req.query.skip)) || 0;
    const take = parseInt(String(req.query.take)) || 20;

    const withdrawals = await this.withdrawalService.getPendingWithdrawals(skip, take);
    
    res.json({
      success: true,
      data: withdrawals.map(w => ({
        ...w,
        amount: w.amount.toString()
      }))
    });
  }

  /**
   * Admin: Process withdrawal (Confirm or Reject).
   */
  async adminProcessWithdrawal(req: Request, res: Response) {
    const id = req.params.id as string;
    const { status, reason } = req.body;

    let updated;
    if (status === 'COMPLETED') {
      updated = await this.withdrawalService.completePayout(id);
    } else {
      if (!reason) throw AppError.badRequest('Rejection reason is required');
      updated = await this.withdrawalService.rejectPayout(id, reason);
    }

    res.json({
      success: true,
      message: `Withdrawal marked as ${status}`,
      data: {
        id: updated.id,
        status: updated.status
      }
    });
  }
}
