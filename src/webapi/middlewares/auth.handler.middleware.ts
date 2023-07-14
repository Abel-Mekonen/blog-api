import { CustomError } from '@error-custom/CustomError';
import { HttpStatusCode } from '@helpers/Constants';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';


export function protectRoute(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if (!token) return next(new CustomError('Access denied', HttpStatusCode.UNAUTHORIZED, undefined));
    
    jwt.verify(token, process.env.JWT_SECRET, (err: Error, payload: any) => {
        if (err) return next(new CustomError('Access denied', HttpStatusCode.UNAUTHORIZED, err.stack));
        req.body.user = payload.id;
        next();
    });
}