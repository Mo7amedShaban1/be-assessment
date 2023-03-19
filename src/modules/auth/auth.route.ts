import express from 'express';

import validationMiddleware from '@common/middlewares/validation.middleware';
import { isAuthMiddleware } from '@common/middlewares/isAuth.middleware';

import {
    login,
    signup,
    verifyEmail,
    verifyEmailVerificationCode,
} from './auth.controller';
import { signupSchema, verifyCodeSchema } from './auth.dto';

const router = express.Router();

router.post('/login', login);

router.post('/signup', ...validationMiddleware(signupSchema), signup);

router.post('/verify-email', isAuthMiddleware, verifyEmail);

router.post(
    '/verify-verification-code',
    ...validationMiddleware(verifyCodeSchema),
    isAuthMiddleware,
    verifyEmailVerificationCode,
);

export default router;
