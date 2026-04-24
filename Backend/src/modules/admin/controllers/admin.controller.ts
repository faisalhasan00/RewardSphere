import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  async getStats(req: Request, res: Response) {
    const stats = await this.adminService.getDashboard();
    res.json({
      success: true,
      data: {
        ...stats,
        totalRevenue: stats.totalRevenue.toString()
      }
    });
  }

  async getUsers(req: Request, res: Response) {
    const skip = parseInt(String(req.query.skip)) || 0;
    const take = parseInt(String(req.query.take)) || 20;
    const users = await this.adminService.listUsers(skip, take);
    
    res.json({
      success: true,
      data: {
        total: users.total,
        items: users.items.map((u: any) => ({
          ...u,
          wallet: u.wallet ? { ...u.wallet, balance: u.wallet.balance.toString() } : null
        }))
      }
    });
  }

  async processWithdrawal(req: Request, res: Response) {
    const id = req.params.id as string;
    const { status, reason } = req.body;

    if (status === 'COMPLETED') {
        await this.adminService.approveWithdrawal(id);
    } else {
        await this.adminService.rejectWithdrawal(id, reason);
    }

    res.json({ success: true, message: `Withdrawal ${status}` });
  }
}
