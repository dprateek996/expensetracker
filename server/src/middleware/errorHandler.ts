import type { ErrorRequestHandler, RequestHandler } from 'express';

import AppError from '../errors/appError.js';
import logger from '../logger.js';

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;
  const message = isAppError ? error.message : 'Internal Server Error';
  const details = isAppError ? error.details : undefined;

  logger.error(`Request ${req.method} ${req.originalUrl} failed`, {
    statusCode,
    message,
    details,
    stack: error.stack
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {})
  });
};

const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(AppError.notFound(`Route ${req.originalUrl} not found`));
};

export { errorHandler, notFoundHandler };
