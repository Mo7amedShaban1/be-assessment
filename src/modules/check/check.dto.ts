import { Schema } from 'express-validator';

export const checkSchema: Schema = {
    name: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
        },
    },
    url: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isURL: {
            errorMessage: "isn't valid URL",
        },
    },
    protocol: {
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isIn: {
            options: [['HTTP', 'HTTPS']],
            errorMessage: 'can be either HTTP or HTTPS',
        },
    },
    port: {
        optional: true,
        isInt: {
            errorMessage: 'should be a integer number',
            bail: true,
        },
        isLength: {
            options: {
                min: 1,
                max: 65535,
            },
            errorMessage: 'should be a number in range 1:65535',
        },
    },
    webhook: {
        optional: true,
        trim: true,
        isURL: {
            errorMessage: "isn't valid URL",
        },
    },
    timeout: {
        optional: true,
        isInt: {
            options: { min: 5 },
            errorMessage:
                'should be an integer num in seconds with min value 5 seconds',
        },
    },
    interval: {
        optional: true,
        isInt: {
            options: { min: 10 },
            errorMessage:
                'should be a an integer num in minutes with min value 10 minutes',
        },
    },
    threshold: {
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: 'should be an integer num with min value 1 failure',
        },
    },
    'authentication.username': {
        optional: true,
        notEmpty: true,
    },
    'authentication.password': {
        notEmpty: {
            if: (value: any, { req }: any) => {
                const username = req.body?.authentication?.username;
                return username && !value;
            },
        },
    },
    // TODO
    httpHeaders: {
        optional: true,
        isArray: {
            errorMessage: 'should be an array',
        },
    },
    'assert.statusCode': {
        optional: true,
        isInt: {
            options: { min: 100, max: 599 },
            errorMessage: 'should be a number in range 100:599',
        },
    },
    tags: {
        optional: true,
        isArray: {
            errorMessage: 'should be an array of strings',
        },
    },
    ignoreSSL: {
        optional: true,
        isBoolean: true,
        errorMessage: 'can be either 1 or 0',
    },
};

export const updateCheckSchema: Schema = {
    name: {
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
        },
    },
    url: {
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isURL: {
            errorMessage: "isn't valid URL",
        },
    },
    protocol: {
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: 'is required',
            bail: true,
        },
        isIn: {
            options: [['HTTP', 'HTTPS']],
            errorMessage: 'can be either HTTP or HTTPS',
        },
    },
    port: {
        optional: true,
        isInt: {
            errorMessage: 'should be a integer number',
            bail: true,
        },
        isLength: {
            options: {
                min: 1,
                max: 65535,
            },
            errorMessage: 'should be a number in range 1:65535',
        },
    },
    webhook: {
        optional: true,
        trim: true,
        isURL: {
            errorMessage: "isn't valid URL",
        },
    },
    timeout: {
        optional: true,
        isInt: {
            options: { min: 5 },
            errorMessage:
                'should be an integer num in seconds with min value 5 seconds',
        },
    },
    interval: {
        optional: true,
        isInt: {
            options: { min: 10 },
            errorMessage:
                'should be a an integer num in minutes with min value 10 minutes',
        },
    },
    threshold: {
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: 'should be an integer num with min value 1 failure',
        },
    },
    'authentication.username': {
        optional: true,
        notEmpty: true,
    },
    'authentication.password': {
        notEmpty: {
            if: (value: any, { req }: any) => {
                const username = req.body?.authentication?.username;
                return username && !value;
            },
        },
    },
    // TODO
    httpHeaders: {
        optional: true,
        isArray: {
            errorMessage: 'should be an array',
        },
    },
    'assert.statusCode': {
        optional: true,
        isInt: {
            options: { min: 100, max: 599 },
            errorMessage: 'should be a number in range 100:599',
        },
    },
    tags: {
        optional: true,
        isArray: {
            errorMessage: 'should be an array of strings',
        },
    },
    ignoreSSL: {
        optional: true,
        isBoolean: true,
        errorMessage: 'can be either 1 or 0',
    },
};
