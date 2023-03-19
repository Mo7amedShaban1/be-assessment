const downtimeInSeconds = (
    prevStatus: number,
    currStatus: number,
    lastDowntime: string,
) => {
    return prevStatus < currStatus
        ? parseInt(`${(Date.now() - new Date(lastDowntime).getTime()) / 1000}`)
        : 0;
};

const uptimeInSeconds = (downtime: number, creationTime: string) => {
    const totalTimeSinceCreation = Date.now() - new Date(creationTime).getTime();
    const totalUptime = totalTimeSinceCreation / 1000 - downtime;

    return Math.floor(totalUptime);
};

const availabilityPercentage = (uptime: number, downtime: number) => {
    const totalTime = uptime + downtime;

    return Math.round((totalTime / uptime) * 100);
};

export const generateReport = (
    expectedStatusCode: number,
    report: any,
    responseTime: number,
    status: number,
) => {
    report.history.push(Date.now());

    report.downtime =
        report.downtime +
        downtimeInSeconds(
            report.status,
            expectedStatusCode === status ? 1 : 0,
            report.updatedAt,
        );

    report.uptime =
        report.uptime + uptimeInSeconds(report.downtime, report.createdAt);

    report.outages =
        expectedStatusCode === status ? report.outages : report.outages++;

    report.availability = availabilityPercentage(report.uptime, report.downtime);

    report.totalResponseTime += responseTime;
    report.numResponses++;
    report.averageResponseTime = Math.floor(
        report.totalResponseTime / report.numResponses,
    );

    return report;
};
