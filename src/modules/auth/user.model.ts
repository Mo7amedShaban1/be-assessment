import { Model, Schema, model, ObjectId } from 'mongoose';
import createException from 'http-errors';
import bcrypt from 'bcrypt';

interface IUser {
    _id?: ObjectId;
    email: string;
    password: string;
    isEmailVerified: boolean;
    verificationCode: string;
    createdAt: Date;
}

interface IUserModel extends Model<IUser> {
    validateUser(email: string, password: string): Promise<IUser | undefined>;
    createUser(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: null,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.statics.validateUser = async function (email: string, password: string) {
    const user: IUser = await this.findOne({ email }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) return user;

    return null;
};

UserSchema.statics.createUser = async function (email: string, password: string) {
    const userExist = await this.exists({ email });

    if (userExist) throw createException(409, 'email is already in use');
    const user: IUser = await this.create({ email, password });

    return user;
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
});

export const User = model<IUser, IUserModel>('User', UserSchema);
