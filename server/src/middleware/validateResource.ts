import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';
import { ZodError } from 'zod';

import AppError from '../errors/appError.js';

interface ValidationSchema {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

const validateResource = (schema: ValidationSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.flatten();
        return next(AppError.badRequest('Validation failed', details));
      }

      return next(error);
    }
  };

export default validateResource;
