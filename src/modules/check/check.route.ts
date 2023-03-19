import express from 'express';

import validationMiddleware from '@common/middlewares/validation.middleware';

import {
    getChecks,
    getCheck,
    updateCheck,
    deleteCheck,
    createCheck,
} from './check.controller';

import { checkSchema, updateCheckSchema } from './check.dto';

const router = express.Router();

router.get('/checks', getChecks);

router.post('/check', ...validationMiddleware(checkSchema), createCheck);

router
    .route('/checks/:id')
    .get(getCheck)
    .patch(...validationMiddleware(updateCheckSchema), updateCheck)
    .delete(deleteCheck);

export default router;
