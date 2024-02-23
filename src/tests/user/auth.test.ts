import supertest from 'supertest';
import app from '../../app.js';

import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import { UserJwtPayload } from '../../models/user.js';

import { ApiResponse } from '../../models/api.js';
import mockFunctionsModule from './mock/account.js';
import { appMessageErros } from '../../errors/index.js';

describe('test battery: AUTHENTICATION', () => {

    const password: string = '123456';
    const email: string = 'someemail@gmail.com';

    it('email availability: should return status 200', async () => {

        const response = await supertest(app).get('/account/check-email-availability/'.concat(email)).send();
        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toBe(200);
        // expect(responseBody.message).toBe('Email disponível');
    });

    it('email availability: should return status 409', async () => {

        const userAccount = await mockFunctionsModule.createUserAccount({ email, password });

        const response = await supertest(app).get('/account/check-email-availability/'.concat(userAccount.email)).send();
        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toBe(409);
        expect(responseBody.message).toBe(appMessageErros.auth.user.emailAlreadyUse);
    });

    it('It should be possible to login into this account', async () => {

        const response = await supertest(app).post('/auth/signin').send({ email, password });
        const responseBody: ApiResponse<{ token: string }> = response.body;

        expect(responseBody.status).toEqual(200);
        // expect(responseBody.message).toEqual('Login efetuado com sucesso!');

        expect(responseBody.data.token).not.toBeNull();
        expect(typeof responseBody.data.token).toBe('string');

        const userJwtPayload = jwt.verify(responseBody.data.token, config.api.env.JWT_SECRET) as UserJwtPayload;
        expect(email).toBe(userJwtPayload.email);
    });

    it('should return 401 wrong password', async () => {

        const response = await supertest(app).post('/auth/signin').send({ email, password: 'wrong' });
        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toEqual(401);
        expect(responseBody.message).toEqual(appMessageErros.auth.user.invalidPassword);
    });

    it('should return 404 wrong email', async () => {

        const response = await supertest(app).post('/auth/signin').send({ email: 'someemail@outlook.com', password });
        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toEqual(404);
        expect(responseBody.message).toEqual(appMessageErros.auth.user.notFound);
    });

    it('should return 401 status', async () => {

        const response = await supertest(app).get('/account/get-account-data')
        .set('Authorization', 'Bearer '.concat('invalidToken')).send();

        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toEqual(401);
        expect(responseBody.message).toEqual('Token inválido');
    });
        
});