import { Request, Response, NextFunction } from 'express';
import createException from 'http-errors';

export const isEmailVerifiedMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { isEmailVerified } = (req as any).auth;

    if (!isEmailVerified)
        return next(createException(400, 'please verify your email first'));

    next();
};
