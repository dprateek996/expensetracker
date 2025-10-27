import cors from 'cors';
import express from 'express';

import { env } from './env.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/config', (_req, res) => {
  res.json({ environment: env.NODE_ENV });
});

const port = env.PORT;

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

export default app;
