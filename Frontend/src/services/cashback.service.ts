import { apiClient } from './api';

export const cashbackService = {
  getHistory: async () => {
    const response = await apiClient.get('/cashback/history');
    return response.data;
  }
};
