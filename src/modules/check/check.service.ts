import { Check } from './check.model';
import { Report } from '@modules/report/report.model';

export const getAll = async (userId: any, page: any = 1, tags?: [], limit = 50) => {
    const skip = page >= 1 ? (page - 1) * limit : page * limit;
    const query: any = {};
    tags?.length ? (query.tags = { $in: tags }) : null;

    const checks = await Check.find({ user: userId, ...query })
        .limit(limit)
        .skip(skip);

    const count = await Check.countDocuments({ user: userId, ...query });

    return { count, total_pages: Math.ceil(count / limit), checks };
};

export const getCheck = async (userId: any, checkId: any) => {
    const check = await Check.findOne({ _id: checkId, user: userId });

    return check;
};

export const createCheckWithReport = async ({ user }: any, body: any) => {
    const check = await Check.create({ user, ...body });

    await Report.create({ check: check.id, user });

    return check;
};

export const updateCheck = async ({ checkId, user }: any, body: any) => {
    const check = await Check.findOneAndUpdate({ _id: checkId, user }, body, {
        new: true,
    });

    return check;
};

export const getCheckById = (checkId: any) => {
    return Check.findById(checkId);
};

export const deleteCheckWithReport = async ({ checkId, userId }: any) => {
    const check = await Check.deleteOne({ _id: checkId, user: userId });

    if (check.deletedCount) {
        await Report.deleteOne({ check: checkId });
        return true;
    }

    return null;
};

export const getChecksFroCronJob = async (limit: number): Promise<any> => {
    return Check.find({ nextCheck: { $lt: new Date() } })
        .select(
            '_id url protocol path port webhook timeout authentication httpHeaders assert ignoreSSL threshold failureCount lastCheckStatus',
        )
        .populate('user', 'email')
        .limit(limit);
};

export const updateNextCheckTimeAndStatus = async (checkId: any, status: 1 | 0) => {
    const check: any = await Check.findById(checkId);

    check.nextCheck = new Date(new Date().getTime() + check.interval);
    check.lastCheckStatus = status;
    check.failureCount = status ? 0 : check.failureCount + 1;
    await check.save();

    return check;
};
