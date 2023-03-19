import { NextFunction, Request, Response } from 'express';
import {
    checkSchema,
    validationResult,
    Schema,
    ValidationError,
} from 'express-validator';

export default (schema: Schema) => {
    const errorFormatter = ({ location, msg, param }: ValidationError) => {
        // TODO
        return `[${param}]: ${param} ${msg}`;
    };
    return [
        checkSchema(schema),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            next();
        },
    ];
};
