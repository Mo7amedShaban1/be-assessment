import Queue from 'bull';
import path from 'path';

const emailQueue = new Queue('emails', {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

// Runs email job in a separated process
const processPath = path.join(__dirname, '../' + 'processes/emails.process.ts');
emailQueue.process(processPath);

export const addEmailToQueue = (to: any, subject: string, text: string) => {
    emailQueue.add(
        {
            to,
            subject,
            text,
        },
        { removeOnComplete: true },
    );
};
