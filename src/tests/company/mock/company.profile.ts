import { CreateCompanyAccountRequest } from '../../../models/profile/company.profile.js'

function getCompanyProfile(name: string, email: string) {

    const profile: CreateCompanyAccountRequest = {

        details: {
            fantasy_name: 'DevJobs',
            description: 'Plataforma de gerenciamento de processos seletivos',
            foundedIn: '2024',
            teamSize: '(1 - 10 colaboradores)',
            marketArea: 'Tech',
            legalNature: 'MEI',
            cnpj: '00.000.000/0000-00',
            socialReason: 'DevJobs LTDA',
            about: 'Forneça os detalhes a serem exibidos no perfil da sua empresa.'
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
            supportEmail: email,
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
            password: '1234',
        }
    }

    return profile
}

const companyMockModule = {
    getCompanyProfile
};

export default companyMockModule