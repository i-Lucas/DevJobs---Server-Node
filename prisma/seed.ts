import chalk from 'chalk';

import dotenv from 'dotenv';
dotenv.config();

import prisma from '../src/config/db.js';

import hiringMockModule from '../src/tests/hiring/mock/hiring.js';
import companyMockModule from '../src/tests/company/mock/company.profile.js';
import developerMockModule from '../src/tests/developer/mock/dev.profile.js';

import hiringService from '../src/services/hiring/hiring.js';
import companyAccountService from '../src/services/company/account.js';
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

async function seedAccounts() {

    const companyAccounts = 1;
    const devAccounts = 25;
    const devEmailPrefix = 'lucas';
    const companyEmailPrefix = 'lucas';

    let __processId = ''

    for (let i = 1; i <= companyAccounts; i++) {

        const email = `${companyEmailPrefix}${i}@company.com`;
        const { data: { accountId: companyAccountId, profileId: companyProfileId, userId } } = await createCompanyAccount(`Lucas Oliveira ${i}`, email);

        info(`Conta do tipo [COMPANY] criada com sucesso - Email: ${email}`);
        info(`Conta criada: ${companyAccountId} Perfil criado: ${companyProfileId} `);

        const deadline = hiringMockModule.getDatePlusThreeDaysInMillis(3).toString();

        const processData = hiringMockModule.newHiringProcess({
            deadline,
            pcd: false,
            rhEmail: 'RH'.concat(email),
            pcdType: '',
            negotiable: true,
            seniority: "Pleno",
            category: "Front-End",
            workload: "Full-Time",
            contractType: "Flexível",
            salaryRange: "Negociável",
            locationType: "Presencial",
            currentStep: 'OPEN_FOR_APPLICATIONS',
            title: `Desenvolvedor Angular Junior ${i}`,
            description: "Desenvolvedor Angular Junior Descrição",
        });

        const { data: { processId } } = await hiringService.createProcess({
            user: {
                email,
                userId,
                accountType: 'COMPANY',
                accountId: companyAccountId,
                profileId: companyProfileId,
            },
            data: processData
        });

        info(`Processo seletivo criado com sucesso: ${processId}`);

        __processId = processId
    }

    for (let i = 1; i <= devAccounts; i++) {

        const email = `${devEmailPrefix}${i}@dev.com`;
        const { data: { accountId: devAccountId, profileId: devProfileId, userId } } = await createDeveloperAccount(`Lucas Oliveira ${i}`, email);

        info(`Conta do tipo [DEVELOPER] criada com sucesso - Email: ${email}`);
        info(`Conta criada: ${devAccountId} Perfil criado: ${devProfileId} `);

        const { message } = await hiringService.applyToProcess({
            processId: __processId,
            candidate: {
                name: `Lucas Oliveira ${i}`,
                picture: 'https://www.svgrepo.com/show/527946/user-circle.svg',
                profileId: devProfileId,
                accountId: devAccountId,
                email,
            }
        })

        warning(message);

    };

}

async function main() {

    if (ENVIRONMENT === 'DEV') {

        await clearDB();
        await seedAccounts();

    } else {

        info('Pulando Seed');
    }

};

main().catch((e) => {

    console.log(e);
    process.exit(1);

}).finally(async () => await prisma.$disconnect());