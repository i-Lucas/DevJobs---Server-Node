import app from '../../app.js';
import pkg from '@prisma/client';
import supertest from 'supertest';
import CryptoJS from "crypto-js";

import jwt from 'jsonwebtoken';

import config from '../../config/index.js';
import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';
import getDeveloperProfile from './mock/dev.profile.js';
import { GetAccountDataResponse } from '../../models/account.js';
import developerMockModule from './mock/dev.profile.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const decrypt = (token: string) => CryptoJS.AES.decrypt(token, config.api.env.KEY_SECRET).toString(CryptoJS.enc.Utf8);

// beforeAll(async () => {

//     await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
//     await prisma.$executeRaw`TRUNCATE TABLE "Account" CASCADE;`;
//     await prisma.$executeRaw`TRUNCATE TABLE "CompanyProfile" CASCADE;`;
//     await prisma.$executeRaw`TRUNCATE TABLE "CandidateProfile" CASCADE;`;

//     console.warn('BANCO DE DADOS DE TESTES LIMPO');
// });

// afterAll(async () => await prisma.$disconnect());

describe('test battery: DEVELOPER ACCOUNT', () => {

    let token = undefined;
    const developer = developerMockModule.getDeveloperProfile('Lucas Oliveira', 'lucasdev@dev.com');

    it('should create a DEVELOPER type account', async () => {

        delete developer.about.picture // insert by database

        const response = await supertest(app).post('/account/create-dev-account').send(developer);

        const responseBody: ApiResponse<{ userId: string, profileId: string, accountId: string }> = response.body;
        
        expect(responseBody.status).toEqual(201);
        expect(responseBody.message).toEqual('Conta criada com sucesso!');

        const dbUser = await prisma.users.findUnique({
            where: {
                email: developer.contact.email
            }
        });

        expect(dbUser.email).toBe(developer.contact.email);

        const dbAccount = await prisma.account.findUnique({
            where: {
                id: responseBody.data.accountId
            }
        })

        expect(responseBody.data.accountId).toBe(dbAccount.id);

        const dbDeveloperProfile = await prisma.candidateProfile.findUnique({
            where: {
                id: responseBody.data.profileId
            }
        })

        expect(typeof responseBody.data.accountId).toBe('string');
        expect(responseBody.data.profileId).toBe(dbDeveloperProfile.id);
    });

    it('It should be possible to login into this account', async () => {

        const response = await supertest(app).post('/auth/signin')
            .send({ email: developer.contact.email, password: developer.password.password });

        const responseBody: ApiResponse<{ token: string }> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Login efetuado com sucesso!');

        expect(responseBody.data.token).not.toBeNull();
        expect(typeof responseBody.data.token).toBe('string');

        const decryptedToken = decrypt(responseBody.data.token);

        const userJwtPayload = jwt.verify(decryptedToken, config.api.env.JWT_SECRET) as UserJwtPayload;
        expect(developer.contact.email).toBe(userJwtPayload.email);

        token = responseBody.data.token;
    });

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

})