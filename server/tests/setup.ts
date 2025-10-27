process.env.NODE_ENV ??= 'test';
process.env.PORT ??= '4000';
process.env.CLIENT_ORIGIN ??= 'http://localhost:5173';
process.env.DATABASE_URL ??= 'file:./dev.db';
process.env.JWT_SECRET ??= 'super-secret-test-key-change-me';
process.env.JWT_EXPIRES_IN ??= '15m';
process.env.BCRYPT_SALT_ROUNDS ??= '4';
