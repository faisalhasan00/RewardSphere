import { prisma } from '../db/prisma';
import { StoreRepository } from '../../modules/store/repositories/store.repository';
import { StoreService } from '../../modules/store/services/store.service';
import { StoreController } from '../../modules/store/controllers/store.controller';
import { AuthRepository } from '../../modules/auth/repositories/auth.repository';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { CategoryRepository } from '../../modules/category/repositories/category.repository';
import { CategoryService } from '../../modules/category/services/category.service';
import { CategoryController } from '../../modules/category/controllers/category.controller';
import { DealRepository } from '../../modules/deal/repositories/deal.repository';
import { DealService } from '../../modules/deal/services/deal.service';
import { DealController } from '../../modules/deal/controllers/deal.controller';
import { TrackingRepository } from '../../modules/tracking/repositories/tracking.repository';
import { TrackingService } from '../../modules/tracking/services/tracking.service';
import { TrackingController } from '../../modules/tracking/controllers/tracking.controller';
import { WalletRepository } from '../../modules/wallet/repositories/wallet.repository';
import { WalletService } from '../../modules/wallet/services/wallet.service';
import { CashbackRepository } from '../../modules/cashback/repositories/cashback.repository';
import { CashbackService } from '../../modules/cashback/services/cashback.service';
import { CashbackController } from '../../modules/cashback/controllers/cashback.controller';
import { WithdrawalRepository } from '../../modules/wallet/repositories/withdrawal.repository';
import { WithdrawalService } from '../../modules/wallet/services/withdrawal.service';
import { WithdrawalController } from '../../modules/wallet/controllers/withdrawal.controller';
import { ReferralRepository } from '../../modules/referral/repositories/referral.repository';
import { ReferralService } from '../../modules/referral/services/referral.service';
import { ReferralController } from '../../modules/referral/controllers/referral.controller';
import { AdminRepository } from '../../modules/admin/repositories/admin.repository';
import { AdminService } from '../../modules/admin/services/admin.service';
import { AdminController } from '../../modules/admin/controllers/admin.controller';
import { MockOTPProvider } from '../services/otp.provider';
import { CacheService } from '../services/cache.service';

// --- Services (Infrastructure) ---
const otpProvider = new MockOTPProvider();
const cacheService = new CacheService();

// --- Repositories ---
const storeRepository = new StoreRepository(prisma);
const authRepository = new AuthRepository(prisma);
const categoryRepository = new CategoryRepository(prisma);
const dealRepository = new DealRepository(prisma);
const trackingRepository = new TrackingRepository(prisma);
const walletRepository = new WalletRepository(prisma);
const withdrawalRepository = new WithdrawalRepository(prisma);
const referralRepository = new ReferralRepository(prisma);
const adminRepository = new AdminRepository(prisma);
const cashbackRepository = new CashbackRepository(prisma);

// --- Services (Domain) ---
const storeService = new StoreService(storeRepository, cacheService);
const categoryService = new CategoryService(categoryRepository, cacheService);
const dealService = new DealService(dealRepository, cacheService);
const trackingService = new TrackingService(trackingRepository, storeRepository, dealRepository);
const walletService = new WalletService(walletRepository);
const referralService = new ReferralService(referralRepository);
const withdrawalService = new WithdrawalService(withdrawalRepository, walletService);
const cashbackService = new CashbackService(cashbackRepository, walletService, referralService);
const authService = new AuthService(authRepository, otpProvider, referralService);
const adminService = new AdminService(
  adminRepository, 
  storeService, 
  dealService, 
  cashbackService, 
  withdrawalService
);

// --- Controllers ---
const storeController = new StoreController(storeService);
const authController = new AuthController(authService);
const categoryController = new CategoryController(categoryService);
const dealController = new DealController(dealService);
const trackingController = new TrackingController(trackingService);
const referralController = new ReferralController(referralService);
const withdrawalController = new WithdrawalController(withdrawalService, walletService);
const adminController = new AdminController(adminService);
const cashbackController = new CashbackController(cashbackService);

export const container = {
  storeController,
  storeService,
  authController,
  authService,
  categoryController,
  categoryService,
  dealController,
  dealService,
  trackingController,
  trackingService,
  cashbackController,
  cashbackService,
  referralController,
  referralService,
  withdrawalController,
  withdrawalService,
  walletService,
  adminController,
  adminService,
  cacheService,
};

export type Container = typeof container;

export function resolve<T extends keyof Container>(key: T): Container[T] {
  return container[key];
}

