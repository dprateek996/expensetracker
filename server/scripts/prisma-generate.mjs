import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDir, '..');

const env = { ...process.env };

if (!env.DATABASE_URL || env.DATABASE_URL.trim().length === 0) {
  env.DATABASE_URL = 'file:./dev.db';
  console.log('DATABASE_URL not set. Falling back to sqlite file database at file:./dev.db');
}

const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = ['prisma', 'generate'];

const child = spawn(executable, args, {
  stdio: 'inherit',
  cwd: projectRoot,
  env
});

child.on('exit', code => {
  process.exit(code ?? 0);
});

child.on('error', error => {
  console.error('Failed to run prisma generate', error);
  process.exit(1);
});
