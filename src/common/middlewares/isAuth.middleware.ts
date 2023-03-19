import { expressjwt } from 'express-jwt';

export const isAuthMiddleware = expressjwt({
    secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    algorithms: ['HS256'],
});
