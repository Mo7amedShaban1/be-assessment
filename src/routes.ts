import express from 'express';

import checksRoutes from '@modules/check/check.route';
import authRoutes from '@modules/auth/auth.route';
import reportsRoutes from '@modules/report/report.route';

import { isAuthMiddleware } from '@common/middlewares';
import { isEmailVerifiedMiddleware } from './common/middlewares/isEmailVerified.middleware';

const router = express.Router();

router.use('/', authRoutes);

router.use('/', isAuthMiddleware, isEmailVerifiedMiddleware, checksRoutes);

router.use('/', isAuthMiddleware, isEmailVerifiedMiddleware, reportsRoutes);

export default router;
