import Queue from 'bull';
import os from 'os';
import path from 'path';
import checksProcess from '../processes/checks.process';

const checkQueue = new Queue('checks', {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

// const processPath = path.join(__dirname, '../' + 'processes/checks.process.ts');
// const numOfCores = os.cpus().len/gth;

// checkQueue.process(numOfCores, processPath);

checkQueue.process(checksProcess);

export const addBulkOfChecks = (checks: [any]) => {
    const jobData = checks.map((check) => ({
        ops: { removeOnComplete: true, removeOnFail: true },
        data: check,
    }));

    checkQueue.addBulk(jobData);
};

export const getNumOfWaitingJobs = () => {
    return checkQueue.getWaitingCount();
};

// export const deleteCompletedJobs = () => {
//     return checkQueue.remove;
// };
