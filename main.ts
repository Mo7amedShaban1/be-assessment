import app from './src/app';
import './src/cron-job';
import './src/db/mongodb-connection';

const port = process.env.PORT;
const host = 'localhost';

app.listen(port, () => {
    console.log(`Server is up and running http://${host}:${port}`);
});

process.on('uncaughtException', (error) => {
    console.log(error);
});

process.on('unhandledRejection', (error) => {
    console.log(error);
});
