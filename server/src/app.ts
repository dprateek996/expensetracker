import cors from 'cors';
import express from 'express';

import { env } from './env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import healthRouter from './routes/health.js';

const app = express();

app.disable('x-powered-by');

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRouter);
app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
