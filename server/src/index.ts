import app from './app.js';
import { env } from './env.js';
import logger from './logger.js';
import { connectPrisma, disconnectPrisma, registerPrismaShutdownHooks } from './prisma.js';

const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

const startServer = async () => {
  try {
    await connectPrisma();
    registerPrismaShutdownHooks();

    const server = app.listen(env.PORT, () => {
      logger.info(`API server listening on http://localhost:${env.PORT}`);
    });

    let isShuttingDown = false;

    const gracefulShutdown = (signal: NodeJS.Signals) => {
      return () => {
        if (isShuttingDown) {
          return;
        }
        isShuttingDown = true;

        logger.warn(`Received ${signal}. Initiating graceful shutdown.`);

        server.close(async closeError => {
          if (closeError) {
            logger.error('Error while closing HTTP server', { error: closeError.message });
            process.exitCode = 1;
          }

          await disconnectPrisma();
          logger.info('Shutdown complete');
          process.exit();
        });
      };
    };

    signals.forEach(signal => {
      process.once(signal, gracefulShutdown(signal));
    });

    process.once('unhandledRejection', reason => {
      logger.error('Unhandled promise rejection detected', { reason });
      gracefulShutdown('SIGTERM')();
    });

    process.once('uncaughtException', error => {
      logger.error('Uncaught exception detected', { error: error.message, stack: error.stack });
      gracefulShutdown('SIGTERM')();
    });
  } catch (error) {
    logger.error('Failed to start server', { error: (error as Error).message });
    process.exit(1);
  }
};

void startServer();
