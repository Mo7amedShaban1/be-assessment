import express from 'express';
import createException from 'http-errors';
import morgan from 'morgan';

import defaultErrorHandler from '@common/utils/default-error.util';
import appRoutes from './routes';

const app = express();
const env = process.env.NODE_ENV;

app.disable('x-powered-by');

if (env === 'development') {
    app.use(morgan('combined'));
}

app.use(express.json());

app.use('/api', appRoutes);

// Handle not found routes
app.use('*', (req, res, next) => {
    next(createException(404, `${req.originalUrl} is not exist`));
});

app.use(defaultErrorHandler);

export default app;
