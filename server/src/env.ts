import dotenv from 'dotenv';
import { z } from 'zod';

import logger from './logger.js';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce
    .number({ invalid_type_error: 'PORT must be a number' })
    .int('PORT must be an integer')
    .positive('PORT must be a positive number')
    .default(3000),
  CLIENT_ORIGIN: z
    .string({ required_error: 'CLIENT_ORIGIN is required' })
    .url('CLIENT_ORIGIN must be a valid URL'),
  DATABASE_URL: z
    .string({ required_error: 'DATABASE_URL is required' })
    .min(1, 'DATABASE_URL is required')
    .default('file:./dev.db'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  BCRYPT_SALT_ROUNDS: z.coerce
    .number({ invalid_type_error: 'BCRYPT_SALT_ROUNDS must be a number' })
    .int('BCRYPT_SALT_ROUNDS must be an integer')
    .min(4, 'BCRYPT_SALT_ROUNDS must be 4 or greater')
    .max(15, 'BCRYPT_SALT_ROUNDS must be 15 or less')
    .default(10)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.flatten().fieldErrors;
  logger.error('Invalid environment variables', formattedErrors);
  throw new Error('Environment validation failed');
}

export const env = parsedEnv.data;
export type AppEnv = typeof env;
