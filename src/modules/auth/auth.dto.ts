import { Schema } from 'express-validator';

export const signupSchema: Schema = {
    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isEmail: {
            errorMessage: 'is not a valid email address',
        },
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'should be at least 8 chars long',
        },
    },
};

export const verifyCodeSchema: Schema = {
    code: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
        },
    },
};
