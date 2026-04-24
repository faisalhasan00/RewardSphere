import { AdminRepository } from '../repositories/admin.repository';
import { StoreService } from '../../store/services/store.service';
import { DealService } from '../../deal/services/deal.service';
import { CashbackService } from '../../cashback/services/cashback.service';
import { WithdrawalService } from '../../wallet/services/withdrawal.service';
import { UserStatus } from '@prisma/client';

export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly storeService: StoreService,
    private readonly dealService: DealService,
    private readonly cashbackService: CashbackService,
    private readonly withdrawalService: WithdrawalService
  ) {}

  async getDashboard() {
    return this.adminRepository.getDashboardStats();
  }

  async listUsers(skip: number, take: number) {
    return this.adminRepository.getUsers(skip, take);
  }

  // --- Management Proxies ---
  
  async approveWithdrawal(id: string) {
    return this.withdrawalService.completePayout(id);
  }

  async rejectWithdrawal(id: string, reason: string) {
    return this.withdrawalService.rejectPayout(id, reason);
  }

  async updateConversionStatus(id: string, status: any) {
    // This calls the secure update logic in CashbackService
    return this.cashbackService.updateStatus(id, status);
  }
}
