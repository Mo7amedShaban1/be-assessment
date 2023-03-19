import createException from 'http-errors';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { User } from './user.model';

const signAccessToken = async (user: any) => {
    const token = await jwt.sign(
        {
            sub: user._id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );

    return `Bearer ${token}`;
};

export const generateVerificationCode = () => {
    const code = crypto.randomInt(100000, 999999).toString();
    return code;
};

export const login = async (email: string, password: string): Promise<any> => {
    const user: any = await User.validateUser(email, password);

    if (!user) throw createException(401, 'Invalid credentials!');
    user.password = undefined;

    const token = await signAccessToken(user);

    return { token, user };
};

export const signup = async (email: string, password: string): Promise<any> => {
    const user: any = await User.createUser(email, password);
    user.password = undefined;

    const token = await signAccessToken(user);

    return { token, user };
};

export const verifyEmailVerificationCode = async (
    verificationCode: string,
    userId: any,
) => {
    const user: any = await User.findById(userId).select('verificationCode');

    if (user.verificationCode !== verificationCode) return null;

    await User.findByIdAndUpdate(userId, {
        isEmailVerified: true,
        verificationCode: null,
    });

    return true;
};

export const findUser = (userId: any) => {
    return User.findById(userId);
};
