import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
const xss = require('xss-clean');
import sanitize from 'express-mongo-sanitize';
import { errorMiddleware } from './middlewares/error';
import { requestIdMiddleware } from './middlewares/requestId';
import { logger } from './core/logger';
import storeRouter from './modules/store/routes/store.routes';
import authRouter from './modules/auth/routes/auth.routes';
import categoryRouter from './modules/category/routes/category.routes';
import dealRouter from './modules/deal/routes/deal.routes';
import { createTrackingRouter } from './modules/tracking/routes/tracking.routes';
import cashbackRouter from './modules/cashback/routes/cashback.routes';
import { createWithdrawalRoutes } from './modules/wallet/routes/withdrawal.routes';
import { createReferralRoutes } from './modules/referral/routes/referral.routes';
import { createAdminRoutes } from './modules/admin/routes/admin.routes';
import { container } from './core/container';
import { apiLimiter } from './middlewares/rateLimiter';

const app: Application = express();

// Track every request with a unique ID
app.use(requestIdMiddleware);

// Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(xss());
app.use(sanitize());
app.use(hpp());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // Guard against large payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev', {
  stream: { write: (message) => logger.http(message.trim()) }
}));

// Apply global rate limiter to all api routes
app.use('/api', apiLimiter);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/stores', storeRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/deals', dealRouter);
app.use('/api/tracking', createTrackingRouter(container.trackingController));
app.use('/api/cashback', cashbackRouter);
app.use('/api/wallet', createWithdrawalRoutes(container.withdrawalController));
app.use('/api/referrals', createReferralRoutes(container.referralController));
app.use('/api/admin', createAdminRoutes(container.adminController));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Cashback Affiliate Platform API' });
});

// Error Handling (Must be last)
app.use(errorMiddleware);

export default app;
