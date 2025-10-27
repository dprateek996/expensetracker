import { PrismaClient } from '@prisma/client';

import logger from './logger.js';

const prisma = new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Failed to connect to database', { error: (error as Error).message });
    throw error;
  }
};

export const disconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from database');
  } catch (error) {
    logger.error('Failed to disconnect Prisma cleanly', { error: (error as Error).message });
  }
};

export const registerPrismaShutdownHooks = () => {
  prisma.$on('beforeExit', async () => {
    logger.info('Prisma beforeExit event triggered');
    await disconnectPrisma();
  });
};

export default prisma;
