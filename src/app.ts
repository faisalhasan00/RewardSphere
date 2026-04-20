import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error';
import { logger } from './core/logger';
import storeRouter from './modules/store/routes/store.routes';
import authRouter from './modules/auth/routes/auth.routes';
import categoryRouter from './modules/category/routes/category.routes';
import dealRouter from './modules/deal/routes/deal.routes';
import { createTrackingRouter } from './modules/tracking/routes/tracking.routes';
import cashbackRouter from './modules/cashback/routes/cashback.routes';
import { container } from './core/container';
import { apiLimiter } from './middlewares/rateLimiter';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
