import { CronJob } from 'cron';

import * as checkService from '@modules/check/check.service';
import {
    addBulkOfChecks,
    getNumOfWaitingJobs,
} from '@modules/job-queues/queues/checks.queue';

// Runs every minute
const job = new CronJob('* * * * *', async () => {
    const waitingJobCount = await getNumOfWaitingJobs();

    console.log('A cron job has been started');
    console.log('Waiting Job queue: ', waitingJobCount);

    if (!waitingJobCount) {
        const checks = await checkService.getChecksFroCronJob(100);

        await addBulkOfChecks(checks);
    }
});

job.start();
