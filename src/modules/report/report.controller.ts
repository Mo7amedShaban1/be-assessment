import { NextFunction, Response } from 'express';

import catchAsyncErrors from '@common/utils/catch-async-errors.util';
import { RequestWithAuth } from '@common/types/request-with-auth';

import * as reportService from './services/report.service';

export const getReports = catchAsyncErrors(
    async (req: RequestWithAuth, res: Response, next: NextFunction) => {
        const checkId = req.query.checkId;
        const { sub: user } = req.auth;
        var { page, tags }: any = req.query;
        if (tags) tags = tags?.split(',') || [];

        const reports = await reportService.getReports(user, page, tags);

        res.status(200).json(reports);
    },
);
