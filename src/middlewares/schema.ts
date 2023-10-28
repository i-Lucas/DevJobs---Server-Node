import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';

interface ValidatedRequest<T> extends Request { body: T };

export default function schemaHandler<T>(schema: Schema<T>) {

    return (req: ValidatedRequest<T>, res: Response, next: NextFunction): NextFunction | Response => {

        const { error } = schema.validate(req.body);

        if (error) return res.status(422).send({
            status: 422,
            message: error.details[0].message
        });

        next();
    };
};