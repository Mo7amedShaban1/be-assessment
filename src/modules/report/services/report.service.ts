import { ObjectId } from 'mongodb';
import { Report } from '../report.model';
import { generateReport } from './report-generator.service';

export const getReports = async (
    user: any,
    page: any = 1,
    tags?: [],
    limit = 50,
) => {
    const skip = page >= 1 ? (page - 1) * limit : page * limit;
    const query: any = {};
    tags?.length ? (query['check.tags'] = { $in: tags }) : null;

    const reports = await Report.aggregate([
        {
            $lookup: {
                from: 'checks',
                localField: 'check',
                foreignField: '_id',
                as: 'check',
            },
        },
        {
            $unwind: '$check',
        },
        {
            $match: {
                user: new ObjectId(user),
                ...query,
            },
        },
        {
            $project: {
                check: 0,
            },
        },
        {
            $limit: limit,
        },
        {
            $skip: skip,
        },
    ]);

    return { reports };
};

// export const getReportByTag = async (user: any, tags: any = []) => {
//     const query: any = {};
//     tags?.length ? (query['check.tags'] = { $in: tags }) : null;

//     const report: any = await Report.aggregate([
//         {
//             $lookup: {
//                 from: 'checks',
//                 localField: 'check',
//                 foreignField: '_id',
//                 as: 'check',
//             },
//         },
//         {
//             $unwind: '$check',
//         },
//         {
//             $match: {
//                 user: new ObjectId(user),
//                 ...query,
//             },
//         },
//         {
//             $group: {
//                 _id: '$user',
//                 downtime: {
//                     $sum: '$downtime',
//                 },
//                 availability: { $avg: '$availability' },
//                 outages: {
//                     $sum: '$outages',
//                 },
//                 uptime: {
//                     $sum: '$uptime',
//                 },
//                 averageResponseTime: {
//                     $avg: '$averageResponseTime',
//                 },
//                 count: { $sum: 1 },
//             },
//         },
//     ]);

//     return report;
// };

export const updateCheckReport = async ({ checkId, responseTime, status }: any) => {
    var report: any = await Report.findOne({ check: checkId }).populate(
        'check',
        'assert',
    );

    await generateReport(
        report?.check?.assert?.statusCode || 200,
        report,
        responseTime,
        status,
    ).save();

    return report;
};
