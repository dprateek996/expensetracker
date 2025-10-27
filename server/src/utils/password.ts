import bcrypt from 'bcryptjs';

import AppError from '../errors/appError.js';
import { env } from '../env.js';

export const hashPassword = async (plainText: string) => {
  try {
    const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
    return bcrypt.hash(plainText, salt);
  } catch (error) {
    throw new AppError('Failed to hash password', 500, { error: (error as Error).message });
  }
};

export const comparePasswords = async (plainText: string, hashedValue: string) => {
  try {
    return bcrypt.compare(plainText, hashedValue);
  } catch (error) {
    throw new AppError('Failed to compare passwords', 500, { error: (error as Error).message });
  }
};
