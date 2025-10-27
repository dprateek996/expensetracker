import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken';

import AppError from '../errors/appError.js';
import { env } from '../env.js';

const defaultSignOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN
};

export const signToken = (payload: Record<string, unknown>, options?: SignOptions) => {
  try {
    return jwt.sign(payload, env.JWT_SECRET, { ...defaultSignOptions, ...options });
  } catch (error) {
    throw new AppError('Failed to sign token', 500, { error: (error as Error).message });
  }
};

export const verifyToken = <T>(token: string, options?: VerifyOptions) => {
  try {
    return jwt.verify(token, env.JWT_SECRET, options) as T;
  } catch (error) {
    throw AppError.unauthorized('Invalid or expired token', {
      error: (error as Error).message
    });
  }
};
