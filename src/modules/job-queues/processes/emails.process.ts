import Queue from 'bull';
import nodemailer from 'nodemailer';

const createTransporter = () =>
    nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

export default ({ data }: Queue.Job<any>, done: Queue.DoneCallback) => {
    const { to, subject, text } = data;

    createTransporter()
        .sendMail({
            to,
            from: `Mohamed Shaaban <${process.env.EMAIL_FROM}>`,
            subject,
            text,
            html: `<p>${text}</p>`,
        })
        .then((val) => {
            done(null, val);
        })
        .catch((error) => {
            done(error);
        });
};
