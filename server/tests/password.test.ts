import { describe, expect, it } from 'vitest';

import { comparePasswords, hashPassword } from '../src/utils/password.js';

describe('password utilities', () => {
  it('hashes and successfully compares passwords', async () => {
    const password = 'my-secure-password';
    const hashed = await hashPassword(password);

    expect(hashed).not.toBe(password);
    await expect(comparePasswords(password, hashed)).resolves.toBe(true);
  });

  it('fails comparison when passwords differ', async () => {
    const hashed = await hashPassword('first-password');

    await expect(comparePasswords('second-password', hashed)).resolves.toBe(false);
  });
});
