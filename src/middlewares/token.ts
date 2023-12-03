import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import config from '../config/index.js';

import { apiErrors } from '../errors/index.js';

export async function tokenHandler(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) apiErrors.Unauthorized('Token não fornecido');

    const user = jwt.verify(token, config.api.env.JWT_SECRET);
    res.locals.user = user;

    next();
};