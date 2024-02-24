import app from '../../app.js';
import pkg from '@prisma/client';
import supertest from 'supertest';
import CryptoJS from "crypto-js";

import jwt from 'jsonwebtoken';

import config from '../../config/index.js';
import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';
import companyMockModule from './mock/company.profile.js';
import { GetAccountDataResponse } from '../../models/account.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

interface CreateCompanyAccountResponseData {
    profileId: string;
    accountId: string;
}

const decrypt = (token: string) => CryptoJS.AES.decrypt(token, config.api.env.KEY_SECRET).toString(CryptoJS.enc.Utf8);

describe('test battery: COMPANY ACCOUNT', () => {

    let token = undefined;
    const company = companyMockModule.getCompanyProfile('Lucas Oliveira', 'lucas.oliveira@gmail.com',);

    it('should create a COMPANY type account', async () => {

        delete company.social.banner // insert by database
        delete company.social.picture // insert by database

        const response = await supertest(app).post('/account/create-company-account').send(company);

        const responseBody: ApiResponse<CreateCompanyAccountResponseData> = response.body;

        console.warn(responseBody)

        expect(responseBody.status).toEqual(201);
        expect(responseBody.message).toEqual('Conta criada com sucesso!');

        const dbUser = await prisma.users.findUnique({
            where: {
                email: company.account.email
            }
        });

        expect(dbUser.email).toBe(company.account.email);

        const dbAccount = await prisma.account.findUnique({
            where: {
                id: responseBody.data.accountId
            }
        });

        expect(responseBody.data.accountId).toBe(dbAccount.id);

        const dbCompanyProfile = await prisma.companyProfile.findUnique({
            where: {
                id: responseBody.data.profileId
            }
        })

        expect(typeof responseBody.data.accountId).toBe('string');
        expect(responseBody.data.profileId).toBe(dbCompanyProfile.id);
    });

    it('It should be possible to login into this account', async () => {

        const response = await supertest(app).post('/auth/signin')
            .send({ email: company.account.email, password: company.account.password });

        const responseBody: ApiResponse<{ token: string }> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Login efetuado com sucesso!');

        expect(responseBody.data.token).not.toBeNull();
        expect(typeof responseBody.data.token).toBe('string');

        const decryptedToken = decrypt(responseBody.data.token);

        const userJwtPayload = jwt.verify(decryptedToken, config.api.env.JWT_SECRET) as UserJwtPayload;
        expect(company.account.email).toBe(userJwtPayload.email);

        token = responseBody.data.token;
    })

    it('it must be possible to obtain company account data', async () => {

        const response = await supertest(app).get('/account/get-account-data')
            .set('Authorization', 'Bearer '.concat(token)).send();

        const responseBody: ApiResponse<GetAccountDataResponse> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Dados da conta obtidos com sucesso!');

        const decryptedToken = decrypt(token);
        const userJwtPayload = jwt.verify(decryptedToken, config.api.env.JWT_SECRET) as UserJwtPayload;

        expect(responseBody.data.user.id).toBe(userJwtPayload.userId);
        expect(responseBody.data.account.id).toBe(userJwtPayload.accountId);
        expect(responseBody.data.profile.id).toBe(userJwtPayload.profileId);
    });

});