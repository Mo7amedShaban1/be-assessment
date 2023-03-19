import mongoose from 'mongoose';

const databaseURL = process.env.DATABASE_URL as string;

mongoose
    .connect(databaseURL, {})
    .then(() => {
        console.log('Successfully connected the MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });
