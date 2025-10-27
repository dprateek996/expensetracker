import { Router } from 'express';

import analyticsRouter from './analytics.js';
import authRouter from './auth.js';
import budgetsRouter from './budgets.js';
import categoriesRouter from './categories.js';
import expensesRouter from './expenses.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/expenses', expensesRouter);
router.use('/categories', categoriesRouter);
router.use('/budgets', budgetsRouter);
router.use('/analytics', analyticsRouter);

export default router;
