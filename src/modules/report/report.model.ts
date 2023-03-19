import { Schema, model, Types } from 'mongoose';

const ReportSchema = new Schema(
    {
        check: {
            type: Types.ObjectId,
            required: true,
            ref: 'Check',
        },
        user: {
            type: Types.ObjectId,
            required: true,
            ref: 'User',
        },
        availability: {
            type: Number,
            required: true, // A percentage of the URL availability.
            default: 0,
        },
        outages: {
            type: Number, // The total number of URL downtimes.
            required: true,
            default: 0,
        },
        downtime: {
            type: Number, // The total time, in seconds, of the URL downtime.
            required: true,
            default: 0,
        },
        uptime: {
            type: Number, // The total time, in seconds, of the URL uptime.
            required: true,
            default: 0,
        },
        averageResponseTime: {
            type: Number,
            required: true,
            default: 0,
        },
        totalResponseTime: {
            type: Number,
            required: true,
            default: 0,
        },
        numResponses: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: Number,
            required: true,
            enum: [0, 1],
            default: 1,
        },
        history: {
            type: [Date],
            default: [],
        },
    },
    { timestamps: true },
);

export const Report = model('Report', ReportSchema);
