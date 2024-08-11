import { NextFunction, Request, Response } from 'express';

export const asyncHandler = (
    requestHandlerFn: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, any>>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        requestHandlerFn(req, res, next).catch(next);
    };
};
