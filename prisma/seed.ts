import chalk from 'chalk';

import dotenv from 'dotenv';
dotenv.config();

import prisma from '../src/config/db.js';

import companyAccountService from '../src/services/company/account.js';

import companyMockModule from '../src/tests/company/mock/company.profile.js';
import developerMockModule from '../src/tests/developer/mock/dev.profile.js';

import developerAccountService from '../src/services/developer/account.js';
import { CreateCompanyAccountRequest } from '../src/models/profile/company.profile.js';
import { CreateDeveloperAccountRequest } from '../src/models/profile/candidate.profile.js';

const prefix = (msg: string) => 'PRISMA SEED: ' + msg;
const info = (msg: string) => console.log(chalk.bold.blue(prefix(msg)));
const error = (msg: string) => console.log(chalk.bold.red(prefix(msg)));
const success = (msg: string) => console.log(chalk.bold.green(prefix(msg)));
const warning = (msg: string) => console.log(chalk.bold.yellow(prefix(msg)));

const ENVIRONMENT = process.env.ENVIRONMENT;

async function clearDB() {

    warning('Limpando banco de dados ...');

    info('Limpando tabela [Users] ...');
    await prisma.$executeRaw`TRUNCATE TABLE "Users" CASCADE;`;
    success('Tabela [Users] limpa com sucesso');

    info('Limpando tabela [Account] ...');
    await prisma.$executeRaw`TRUNCATE TABLE "Account" CASCADE;`;
    success('Tabela [Account] limpa com sucesso');

    info('Limpando tabela [CandidateProfile] ...');
    await prisma.$executeRaw`TRUNCATE TABLE "CandidateProfile" CASCADE;`;
    success('Tabela [CandidateProfile] limpa com sucesso');

    info('Limpando tabela [CompanyProfile] ...');
    await prisma.$executeRaw`TRUNCATE TABLE "CompanyProfile" CASCADE;`;
    success('Tabela [CompanyProfile] limpa com sucesso');

    warning('Banco de dados limpo com sucesso\n');
}

async function createCompanyAccount(name: string, email: string) {

    const profile: CreateCompanyAccountRequest = companyMockModule.getCompanyProfile(name, email);

    try {

        const response = await companyAccountService.createCompanyAccount(profile);
        return response;

    } catch (e) {

        error('Erro ao criar conta empresa: ' + JSON.stringify(e));
    }
};

async function createDeveloperAccount(name: string, email: string) {

    const profile: CreateDeveloperAccountRequest = developerMockModule.getDeveloperProfile(name, email);

    try {

        const response = await developerAccountService.createDeveloperAccount(profile);
        return response;


    } catch (e) {

        error('Erro ao criar conta empresa: ' + JSON.stringify(e));
    }
}

async function main() {

    if (ENVIRONMENT === 'TEST') {

        info('TESTES: Pulando Seed');

    } else {

        await clearDB();

        info('Criando conta do tipo [COMPANY] ...');
        const { data: { accountId: companyAccountId, profileId: companyProfileId } } = await createCompanyAccount('Lucas Oliveira', 'lucas@company.com');
        success('Conta do tipo [COMPANY] criada com sucesso');        

        warning('Conta criada: ' + companyAccountId);
        warning('Perfil criado: ' + companyProfileId);

        info('Criando conta do tipo [DEVELOPER] ...');
        const { data: { accountId: devAccountId, profileId: devProfileId } } = await createDeveloperAccount('Lucas Oliveira', 'lucas@dev.com');
        success('Conta do tipo [DEVELOPER] criada com sucesso');

        warning('Conta criada: ' + devAccountId);
        warning('Perfil criado: ' + devProfileId);
    }

};

main().catch((e) => {

    console.log(e);
    process.exit(1);

}).finally(async () => await prisma.$disconnect());