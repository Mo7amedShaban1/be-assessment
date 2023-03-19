import express from 'express';

import validationMiddleware from '@common/middlewares/validation.middleware';
import { getReports } from './report.controller';

const router = express.Router();

router.get('/reports', getReports);

export default router;
