import pkg from '@prisma/client';
import supertest from 'supertest';
import app from '../../app.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

describe('get hello test', () => {

    it('should return status 200', async () => {
        const response = await supertest(app).get('/hello').send();
        expect(response.status).toEqual(200);
    });
});

afterAll(async () => await prisma.$disconnect());