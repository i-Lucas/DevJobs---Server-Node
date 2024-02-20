import chalk from 'chalk';
import prisma from '../src/config/db.js';

import companyAccountService from '../src/services/company/account.js';
import { CreateCompanyAccountRequest } from '../src/models/profile/company.profile.js';

const prefix = (msg: string) => 'PRISMA SEED: ' + msg;
const info = (msg: string) => console.log(chalk.bold.blue(prefix(msg)));
const error = (msg: string) => console.log(chalk.bold.red(prefix(msg)));
const success = (msg: string) => console.log(chalk.bold.green(prefix(msg)));
const warning = (msg: string) => console.log(chalk.bold.yellow(prefix(msg)));

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

    const profile: CreateCompanyAccountRequest = {

        details: {
            fantasy_name: "DevJobs",
            description: "Plataforma de gerenciamento de processos seletivos",
            foundedIn: "2024",
            teamSize: "(1 - 10 colaboradores)",
            marketArea: "Tech",
            legalNature: "MEI",
            cnpj: "00.000.000/0000-00",
            socialReason: "DevJobs LTDA",
            about: "Forneça os detalhes a serem exibidos no perfil da sua empresa."
        },
        address: {
            cep: "41999-999",
            address: "Nome da Rua",
            number: "777",
            neighborhood: "Nome do Bairro",
            city: "Salvador",
            complement: "Apt",
            state: "Bahia"
        },
        suport: {
            whatsapp: "(00)-0-0000-0000",
            phone: "(00)-0-0000-0000",
            rhEmail: email,
            supportEmail: email,
        },
        social: {
            website: "https://www.google.com.br",
            linkedin: "https://www.google.com.br",
            facebook: "https://www.google.com.br",
            twitter: "https://www.google.com.br",
            instagram: "https://www.google.com.br",
            github: "https://www.google.com.br",
            banner: '',
            picture: ''
        },
        account: {
            name,
            email,
            phone: "(00)-0-0000-0000",
            password: "@1234",
        }
    }

    try {

        const response = await companyAccountService.createCompanyAccount(profile);
        return response;

    } catch (e) {

        error('Erro ao criar conta empresa: ' + JSON.stringify(e));
    }
}

async function main() {

    await clearDB();

    info('Criando conta do tipo [COMPANY] ...');
    const { data: { accountId, profileId } } = await createCompanyAccount('Lucas Oliveira', 'lucas@dev.com.br');
    success('Conta do tipo [COMPANY] criada com sucesso');

    warning('Conta criada: ' + accountId);
    warning('Perfil criado: ' + profileId);

};

main().catch((e) => {

    console.log(e);
    process.exit(1);

}).finally(async () => await prisma.$disconnect());


/*


{
    "title": "Novo Processo Seletivo",
    "description": "Descrição do processo seletivo",
    "category": "Front-End",
    "seniority": "Júnior",
    "differences": [
        "Certificações relevantes para as tecnologias utilizadas",
        "Implementação de pipelines CI/CD",
        "Conhecimento em práticas DevOps",
        "Design e implementação de arquiteturas escaláveis",
        "Conhecimento em microservices",
        "Experiência comprovada em projetos relevantes",
        "Participação em projetos open source",
        "Experiência em práticas de segurança cibernética",
        "Certificações em segurança, como CISSP",
        "Certificação Scrum",
        "Proatividade",
        "Experiência prática em métodos ágeis (Scrum, Kanban)",
        "Histórico de resolução eficaz de problemas",
        "Participação em hackathons ou competições de programação",
        "Conhecimento profundo em frameworks populares como React, Angular, Vue.js, Django, Flask, Spring Boot, etc.",
        "Conhecimento em React Native, Flutter, Swift, Kotlin",
        "Experiência com ferramentas como Docker, Kubernetes",
        "Boas habilidades de comunicação verbal e escrita",
        "Experiência em trabalho colaborativo em equipes distribuídas",
        "Experiência em empresas de tecnologia renomadas",
        "Experiência avançada em linguagens como JavaScript, Python, Java, C#",
        "Experiência em arquiteturas de nuvem (AWS, Azure, Google Cloud)",
        "Experiência em desenvolvimento mobile (iOS, Android)",
        "Graduação em Ciência da Computação, Engenharia de Software, ou área relacionada",
        "Pós-graduação ou certificações relevantes",
        "Experiência em processamento e análise de big data",
        "Conhecimento em frameworks de machine learning como TensorFlow, PyTorch",
        "Contribuições regulares para repositórios open source",
        "Certificação PMP ou PRINCE2",
        "Experiência em liderança técnica de equipes",
        "Habilidade de aprendizado rápido",
        "Pensamento crítico e analítico",
        "Participação ativa em meetups, conferências e grupos de desenvolvedores"
    ],
    "stacklist": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Angular",
        "Vue",
        "Svelte",
        "Ember",
        "Backbone",
        "jQuery",
        "Bootstrap",
        "Tailwind CSS",
        "Webpack",
        "Babel"
    ],
    "requirements": [
        "Experiência com trabalho em equipe",
        "Habilidade para aprender rapidamente",
        "Boa comunicação interpessoal",
        "Conhecimento básico em redes e sistemas",
        "Conhecimento de padrões de desenvolvimento de software",
        "Familiaridade com metodologias ágeis (Scrum, Kanban)",
        "Capacidade de documentar código e processos",
        "Interesse em aprimorar habilidades técnicas continuamente"
    ],
    "benefits": [
        "Ajuda de Custo",
        "Horário Flexível",
        "Seguro de Vida",
        "Licença Maternidade/Paternidade Estendida",
        "Descontos em Graduações e Pós-graduações",
        "Bolsa de 90% para Estudos de Idiomas",
        "Home Office",
        "Desconto em Farmácia",
        "Plano Odontológico",
        "Vale Transporte em Cartão Flexível",
        "Assistência Médica",
        "Horário de Trabalho Flexível",
        "Participação nos Lucros e Resultados (PLR)",
        "Auxílio Creche",
        "Plano de Carreira",
        "Cultura Organizacional Inovadora",
        "Eventos e Atividades de Integração",
        "Licença Sem Vencimento",
        "Café e Lanches no Escritório",
        "Programas de Bem-Estar no Trabalho",
        "Cursos e Treinamentos Subsidiados pela Empresa",
        "Auxílio Home Office (Ergonomia e Equipamentos)",
        "Day Off no Aniversário",
        "Programas de Mentoria",
        "Desenvolvimento Profissional Contínuo",
        "Assinatura de Plataformas de Aprendizado Online",
        "Benefícios de Academia (Gympass)"
    ],
    "salaryRange": "Negociável",
    "salaryRange_from": "",
    "salaryRange_to": "",
    "negotiable": true,
    "contractType": "CLT",
    "locationType": "Remoto",
    "workload": "Full-Time",
    "enableSuggestions": true,
    "deadline": "1707534000000",
    "pcd": false
}

*/