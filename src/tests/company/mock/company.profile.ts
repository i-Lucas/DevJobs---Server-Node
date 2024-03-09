import { CreateCompanyAccountRequest } from '../../../models/profile/company.profile.js';

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const legalNatures = ['MEI', 'LTDA', 'S/A', 'EIRELI', 'Sociedade Simples'];
const foundedIns = ['2020', '2021', '2022', '2023', '2024', '2018', '2019', '2017', '2016'];
const cnpjs = ['00.000.000/0000-00', '11.111.111/1111-11', '22.222.222/2222-22', '33.333.333/3333-33', '44.444.444/4444-44'];
const socialReasons = ['DevJobs LTDA', 'TechSolutions S/A', 'Innovative Technologies LTDA', 'WebMasters EIRELI', 'ByteSavvy LTDA'];
const marketAreas = ['Tech', 'Finance', 'Healthcare', 'Education', 'E-commerce', 'Transportation', 'Entertainment', 'Hospitality'];
const fantasyNames = ['DevJobs', 'TechPros', 'CodeNinja', 'InnovaTech', 'ByteSavvy', 'WebMasters', 'InnoHive', 'TechVille', 'NexGen'];
const teamSizes = ['(1 - 10 colaboradores)', '(11 - 50 colaboradores)', '(51 - 100 colaboradores)', '(101 - 500 colaboradores)', '(501+ colaboradores)'];
const abouts = ['Forneça os detalhes a serem exibidos no perfil da sua empresa.', 'Somos apaixonados por tecnologia e inovação.', 'Buscamos melhorar a vida das pessoas através da tecnologia.', 'Nosso objetivo é ser a referência em nosso setor.'];
const descriptions = ['Plataforma de gerenciamento de processos seletivos', 'Empresa de tecnologia inovadora', 'Líder em soluções digitais', 'Fornecendo soluções de ponta em tecnologia', 'Conectando pessoas e tecnologia', 'Especialistas em transformação digital'];

// Função para gerar um perfil aleatório
function getCompanyProfile(name: string, email: string) {

    const profile: CreateCompanyAccountRequest = {

        details: {
            fantasy_name: getRandomElementFromArray(fantasyNames),
            description: getRandomElementFromArray(descriptions),
            foundedIn: getRandomElementFromArray(foundedIns),
            teamSize: getRandomElementFromArray(teamSizes),
            marketArea: getRandomElementFromArray(marketAreas),
            legalNature: getRandomElementFromArray(legalNatures),
            cnpj: getRandomElementFromArray(cnpjs),
            socialReason: getRandomElementFromArray(socialReasons),
            about: getRandomElementFromArray(abouts)
        },
        address: {
            cep: '41999-999',
            address: 'Nome da Rua',
            number: '777',
            neighborhood: 'Nome do Bairro',
            city: 'Salvador',
            complement: 'Apt',
            state: 'Bahia'
        },
        suport: {
            whatsapp: '(00)-0-0000-0000',
            phone: '(00)-0-0000-0000',
            rhEmail: email,
            supportEmail: email
        },
        social: {
            website: 'https://www.google.com.br',
            linkedin: 'https://www.google.com.br',
            facebook: 'https://www.google.com.br',
            twitter: 'https://www.google.com.br',
            instagram: 'https://www.google.com.br',
            github: 'https://www.google.com.br',
            banner: '',
            picture: ''
        },
        account: {
            name,
            email,
            phone: '(00)-0-0000-0000',
            password: '1234'
        }
    };

    return profile;
}

const companyMockModule = {
    getCompanyProfile
};

export default companyMockModule;