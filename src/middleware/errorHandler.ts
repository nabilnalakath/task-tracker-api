import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('error message', err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
