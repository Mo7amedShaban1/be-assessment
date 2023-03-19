import { NextFunction, Request, Response } from 'express';
import createException from 'http-errors';

import catchAsyncErrors from '@common/utils/catch-async-errors.util';
import { RequestWithAuth } from '@common/types/request-with-auth';

import { addEmailToQueue } from '@modules/job-queues/queues/emails.queue';

import * as authService from './auth.service';

export const login = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const { user, token } = await authService.login(email, password);

        res.status(200).json({
            access_token: token,
            user,
        });
    },
);

export const signup = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const { user, token } = await authService.signup(email, password);

        res.status(201).json({
            access_token: token,
            user,
        });
    },
);

export const verifyEmailVerificationCode = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const { sub: userId, isEmailVerified } = req.auth;
        const code = req.body.code;

        if (isEmailVerified) throw createException(409, 'Email is already verified');

        const user = await authService.verifyEmailVerificationCode(code, userId);

        if (!user) throw createException(400, 'Invalid code');

        res.status(200).json({
            status: 'success',
        });
    },
);

export const verifyEmail = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const { sub: userId, isEmailVerified } = req.auth;

        if (isEmailVerified) throw createException(409, 'Email is already verified');

        const user: any = await authService.findUser(userId);
        const verificationCode = authService.generateVerificationCode();

        user.verificationCode = verificationCode;
        user.save();

        addEmailToQueue(
            user?.email,
            'Verification code',
            `Your verification code is ${verificationCode}`,
        );

        res.status(200).json({
            status: 'success',
        });
    },
);
