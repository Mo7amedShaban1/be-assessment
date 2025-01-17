import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type RequestWithAuth = Request & {
    auth: JwtPayload;
};
