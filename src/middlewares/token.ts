import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";
import config from '../config/index.js';

import { apiErrors } from '../errors/index.js';
import { NextFunction, Request, Response } from 'express';

export async function tokenHandler(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) apiErrors.Unauthorized('Token não fornecido');

    try {

        const decryptedToken = CryptoJS.AES.decrypt(token, config.api.env.KEY_SECRET).toString(CryptoJS.enc.Utf8);
        const user = jwt.verify(decryptedToken, config.api.env.JWT_SECRET);
        res.locals.user = user;
        next();

    } catch (error) {

        apiErrors.Unauthorized('Token inválido');
    }
};