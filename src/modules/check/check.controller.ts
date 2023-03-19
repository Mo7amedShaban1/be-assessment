import { NextFunction, Request, Response } from 'express';

import catchAsyncErrors from '@common/utils/catch-async-errors.util';
import { RequestWithAuth } from '@common/types';

import * as checkService from './check.service';
import createException from 'http-errors';

export const getChecks = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const userId = req.auth.sub;
        var { page, tags }: any = req.query;
        if (tags) tags = tags?.split(',') || [];

        const result = await checkService.getAll(userId, page, tags);

        res.status(200).json(result);
    },
);

export const getCheck = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const userId = req.auth.sub;
        const checkId = req.params.id;

        const check = await checkService.getCheck(userId, checkId);

        if (!check) throw createException(404, `URL check is not found`);

        res.status(200).json({ check });
    },
);

export const createCheck = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const { sub: user } = req.auth;

        const check = await checkService.createCheckWithReport({ user }, req.body);

        res.status(201).json({ check });
    },
);

export const updateCheck = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const { sub: user } = req.auth;
        const checkId = req.params.id;

        const check = await checkService.updateCheck({ checkId, user }, req.body);

        if (!check) throw createException(404, `URL check is not found`);

        res.status(200).json({ check });
    },
);

export const deleteCheck = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const { sub: user } = req.auth;
        const checkId = req.params.id;

        const check = await checkService.deleteCheckWithReport({ checkId, user });

        if (!check) throw createException(404, `URL check is not found`);

        res.status(204).json({});
    },
);
