import { Schema, model, Types } from 'mongoose';

const CheckSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            // unique: true,
        },
        protocol: {
            type: String,
            required: true,
            enum: ['HTTP', 'HTTPS'],
        },
        path: String,
        port: Number,
        webhook: String,
        timeout: {
            type: Number,
            default: 60, // 60 Seconds,
        },
        interval: {
            type: Number,
            default: 10, // 10 Minutes
        },
        threshold: {
            type: Number,
            default: 1, // (1 failure) The threshold of failed requests that will create an alert
        },
        failureCount: {
            type: Number,
            default: 0,
        },
        authentication: {
            username: String,
            password: String,
        },
        httpHeaders: [
            {
                header: String,
                value: String,
            },
        ],
        assert: {
            statusCode: Number,
        },
        tags: [
            {
                type: String,
                index: true,
            },
        ],
        ignoreSSL: {
            type: Boolean,
            default: true,
        },
        nextCheck: {
            type: Date,
            default: null,
        },
        lastCheckStatus: {
            type: Number,
            enum: [0, 1],
            default: null,
        },
    },
    { timestamps: true },
);

CheckSchema.pre('save', function (next) {
    if (!this.nextCheck) {
        this.timeout = this.timeout * 1000;
        this.interval = this.interval * 60 * 1000;
        this.nextCheck = new Date(Date.now() + 1000);
    }
    next();
});

export const Check = model('Check', CheckSchema);
