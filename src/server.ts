import app from './app';
import { config } from './config';
import { logger } from './core/logger';

const startServer = () => {
  try {
    const port = config.PORT;

    const server = app.listen(port, () => {
      logger.info(`🚀 Server running in ${config.NODE_ENV} mode on port ${port}`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      logger.info('Shutting down server...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
