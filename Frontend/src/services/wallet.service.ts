import { apiClient } from './api';

export interface WalletDashboardData {
  balances: {
    confirmed: string;
    pending: string;
  };
  recentTransactions: any[];
}

export const walletService = {
  getDashboard: async (): Promise<WalletDashboardData> => {
    const response = await apiClient.get('/wallet/dashboard');
    return response.data.data;
  },

  requestWithdrawal: async (amountPaise: number, upiId: string) => {
    const response = await apiClient.post('/wallet/request', { amountPaise, upiId });
    return response.data;
  }
};
