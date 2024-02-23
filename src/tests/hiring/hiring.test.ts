import app from '../../app.js';
import pkg from '@prisma/client';
import supertest from 'supertest';

import jwt from 'jsonwebtoken';
import hiringMockModule from './mock/hiring.js';
import { ApiResponse } from '../../models/api.js';

import config from '../../config/index.js';
import { UserJwtPayload } from '../../models/user.js';
import { HiringProcess, JobOfferData } from '../../models/hiring.js';
import companyMockModule from '../company/mock/company.profile.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

interface CreateCompanyAccountResponseData {
    profileId: string;
    accountId: string;
}

interface NewHiringProcessResponse {

    stepId: string;
    processId: string;
    recruiter: string;

    defaultLists: {
        qualifiedListId: string;
        subscribersListId: string;
    }
}

describe('test battery: HIRING', () => {

    let token: string | undefined;
    let hiringProcessId: string | undefined;

    const companyProfile = companyMockModule.getCompanyProfile('Lucas Oliveira', 'lucasdev@gmail.com');

    delete companyProfile.social.banner // insert by database
    delete companyProfile.social.picture // insert by database

    it('should create a account type COMPANY', async () => {

        const response = await supertest(app).post('/account/create-company-account').send(companyProfile);

        const responseBody: ApiResponse<CreateCompanyAccountResponseData> = response.body;

        expect(responseBody.status).toEqual(201);
        expect(responseBody.message).toEqual('Conta criada com sucesso!');
    });

    it('It should be possible to log into the account to obtain the token', async () => {

        const response = await supertest(app).post('/auth/signin')
            .send({ email: companyProfile.account.email, password: companyProfile.account.password });

        const responseBody: ApiResponse<{ token: string }> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Login efetuado com sucesso!');

        expect(responseBody.data.token).not.toBeNull();
        expect(typeof responseBody.data.token).toBe('string');

        const userJwtPayload = jwt.verify(responseBody.data.token, config.api.env.JWT_SECRET) as UserJwtPayload;
        expect(companyProfile.account.email).toBe(userJwtPayload.email);

        token = responseBody.data.token;

    });

    it('should return an empty list', async () => {

        const response = await supertest(app).get('/hiring/get')
            .set('Authorization', 'Bearer '.concat(token)).send();

        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Nenhum processo seletivo foi encontrado.');
    });

    it('should return 404 status', async () => {

        const response = await supertest(app).get('/offer/get/'.concat(hiringProcessId))
            .set('Authorization', 'Bearer '.concat(token)).send();

        const responseBody: ApiResponse<null> = response.body;

        expect(responseBody.status).toEqual(404);          
        expect(responseBody.message).toEqual('Vaga não encontrada.');
    });

    it('should create a new HIRING process', async () => {

        const deadline = hiringMockModule.getDatePlusThreeDaysInMillis(3).toString();

        const hiringData = hiringMockModule.newHiringProcess({

            deadline,
            pcd: false,
            negotiable: true,
            seniority: "Pleno",
            category: "Front-End",
            workload: "Full-Time",
            contractType: "Flexível",
            salaryRange: "Negociável",
            locationType: "Presencial",
            title: "Desenvolvedor Angular Junior",
            description: "Desenvolvedor Angular Junior Descrição",
        });

        const response = await supertest(app).post('/hiring/new')
            .set('Authorization', 'Bearer '.concat(token)).send(hiringData);

        const responseBody: ApiResponse<NewHiringProcessResponse> = response.body;

        expect(responseBody.status).toEqual(201);
        expect(responseBody.message).toEqual('Processo seletivo iniciado com sucesso!');

        expect(responseBody.data.recruiter === companyProfile.account.email);

        const dbProcess = await prisma.hiringProcess.findUnique({
            where: {
                id: responseBody.data.processId
            }
        })

        expect(dbProcess.title === hiringData.title);
        expect(dbProcess.id === responseBody.data.processId);

        hiringProcessId = dbProcess.id;
    });

    it('it should be possible to obtain all processes of a company', async () => {

        const response = await supertest(app).get('/hiring/get')
            .set('Authorization', 'Bearer '.concat(token)).send();

        const responseBody: ApiResponse<{ processList: HiringProcess[] }> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.message).toEqual('Processos seletivos encontrados com sucesso!');

        const process = responseBody.data.processList.find(process => process.id === hiringProcessId);

        expect(process.id === hiringProcessId);
        expect(process.recruiter === companyProfile.account.email);
    });

    it('should search for the selection process by ID', async () => {

        const response = await supertest(app).get('/offer/get/'.concat(hiringProcessId))
            .set('Authorization', 'Bearer '.concat(token)).send();

        const responseBody: ApiResponse<JobOfferData> = response.body;

        expect(responseBody.status).toEqual(200);
        expect(responseBody.data.offer.id).toEqual(hiringProcessId);        
        expect(responseBody.message).toEqual('Vaga encontrada com sucesso !');
    });

});