import { describe, expect, it } from 'vitest';

import { signToken, verifyToken } from '../src/utils/jwt.js';

describe('jwt utilities', () => {
  it('signs and verifies payloads', () => {
    const token = signToken({ userId: '123' });
    const decoded = verifyToken<{ userId: string; exp: number }>(token);

    expect(decoded.userId).toBe('123');
    expect(decoded.exp).toBeTypeOf('number');
  });

  it('throws for invalid tokens', () => {
    expect(() => verifyToken('not-a-real-token')).toThrowError(/Invalid or expired token/);
  });
});
