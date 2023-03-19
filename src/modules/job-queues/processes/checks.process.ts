import Queue from 'bull';

import { sendHttpRequest } from '@common/utils/axios.util';
import * as reportService from '@modules/report/services/report.service';
import * as checkService from '@modules/check/check.service';
import { addEmailToQueue } from '@modules/job-queues/queues/emails.queue';

// import '../../../db/mongodb-connection';

export default async ({ data }: Queue.Job<any>, done: Queue.DoneCallback) => {
    const {
        _id: id,
        url,
        protocol,
        path,
        port,
        webhook,
        timeout,
        authentication,
        httpHeaders,
        ignoreSSL,
        threshold,
        failureCount,
        lastCheckStatus,
        user,
    } = data;
    const assertStatusCode = data?.assert?.statusCode || 200;
    try {
        console.log('processing.....');

        // Sending axios request to test the URL
        const { responseTime, status } = await sendHttpRequest(url, {
            timeout,
        });

        // Update next check time along with last check status whether it's UP or DOWN
        await checkService.updateNextCheckTimeAndStatus(
            id,
            assertStatusCode === status ? 1 : 0,
        );

        // Update check report document based on the URL request's result
        await reportService.updateCheckReport({ checkId: id, responseTime, status });

        // Check if the URL response matched the asserted status code that a user expect
        if (assertStatusCode === status) {
            // Check if the URL was down, then went up
            if (lastCheckStatus === 0) {
                // Notify user that his/her URL check is up
                await addEmailToQueue(
                    user?.email,
                    'URL check status',
                    `Your URL check is up and running now`,
                );
            }
        } else {
            console.log('Notify User');
            const count = failureCount + 1;
            if (count === threshold) {
                // Notify user that his/her URL check is down after num of failures
                await addEmailToQueue(
                    user?.email,
                    'URL check status',
                    `Your URL check went down after ${count} failures`,
                );
            }
        }

        console.log('Processing done!');
        done();
    } catch (error: any) {
        done(error);
    }
};
