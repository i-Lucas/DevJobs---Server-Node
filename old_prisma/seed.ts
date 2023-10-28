// const profile_resume = "Olá, tudo bem ? Me chamo Lucas Emmanuel, e sou desenvolvedor fullstack. Eu amo programação e tecnologia, e acredito que essas são as principais ferramentas de transformação da sociedade. Amo desafios e aprender coisas novas e estou sempre estudando, aprendendo novas tecnologias e me aperfeiçoando."
// const exp_eb = "Atuei como auxiliar administrativo operacional na divisão de engenharia do CCOMGEX DF, onde fui responsável por apoiar as atividades administrativas e operacionais da equipe. Minhas principais tarefas incluíam gerenciamento de documentos, organização de arquivos e apoio logístico para as equipes de engenharia."
// const exp_volt = "Desenvolvimento de APIs, aplicativos e dashboards usando React, Graphql, React Native e Typescript. Gerenciamento de bancos de dados Postgres e utilização de tecnologias de contêineres como Docker e Kubernetes. Implementação de metodologias ágeis como Scrum e Kanban para aumentar a produtividade da equipe. Participação em reuniões diárias, planejamento de sprints e retrospectivas para melhorar a entrega de projetos."

// import { PrismaClient, User } from '@prisma/client';
// const prisma = new PrismaClient();

// import bcrypt from "bcrypt";

// async function main() {

//     console.log('\nExecutando a seed ...');
//     console.log('Limpando as tabelas ...')

//     await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;

//     // console.log('Tabelas limpas ...');
//     // console.log('Criando usuário ...');

//     // const user = await prisma.user.create({
//     //     data: {
//     //         name: 'Lucas',
//     //         email: 'lucas@dev.com',
//     //         password: await bcrypt.hash('123456', 10),
//     //     }
//     // });

//     // console.log("\nUsuário criado: ", user)

//     // const userProfile = await prisma.userCurriculumProfile.create({ data: { userId: user.id } });

//     /*
//     await prisma.userProfileHeader.create({
//         data: {
//             profileId: userProfile.id,
//             profile_name: 'Lucas Emmanuel Oliveira Melo',
//             profile_job_title: 'Desenvolvedor Node | Angular',
//             profile_img: 'https://avatars.githubusercontent.com/u/93502599?v=4',
//             profile_resume,
//             profile_location: 'Salvador - Bahia',
//             profile_phone: '( 71 ) 9 9933 3511',
//             profile_git_link: 'https://github.com/i-Lucas',
//             profile_linkedin_link: 'https://www.linkedin.com/in/hilucas/',
//             profile_gmail_link: 'mailto:novo.contato.lucas@gail.com',
//         }
//     });

//     await prisma.userProfileAcademicEducation.createMany({
//         data: [
//             {
//                 profileId: userProfile.id,
//                 institution: 'Uninter',
//                 course: 'Análise e Desenvolvimento de Sistemas',
//                 type: 'Tecnólogo',
//                 status: 'Concluído',
//                 from: new Date('2015-01-01'),
//                 to: new Date('2017-01-01'),
//             },
//             {
//                 profileId: userProfile.id,
//                 institution: 'UFBA',
//                 course: 'Ciências da Computação',
//                 type: 'Bacharelado',
//                 status: 'Cursando',
//                 from: new Date('2019-06-01'),
//                 to: new Date('2020-8-01'),
//             },
//         ],
//     });

//     await prisma.userProfileJobExperiences.createMany({
//         data: [
//             {
//                 profileId: userProfile.id,
//                 company_name: 'Exército Brasileiro',
//                 occupation: 'Soldado',
//                 from: new Date('2015-01-01'),
//                 to: new Date('2017-01-01'),
//                 resume: exp_eb,
//                 current_job: true
//             },
//             {
//                 profileId: userProfile.id,
//                 company_name: 'Voltbras Eletropostos',
//                 occupation: 'Desenvolvedor FullStack',
//                 from: new Date(`2022-11-01`),
//                 to: new Date(`2023-06-01`),
//                 resume: exp_volt,
//                 current_job: false
//             },
//             {
//                 profileId: userProfile.id,
//                 company_name: 'Experiência Fake',
//                 occupation: 'Fake',
//                 from: new Date('2019-06-01'),
//                 to: new Date('2020-8-01'),
//                 resume: exp_eb,
//                 current_job: false
//             },
//         ],
//     });

//     await prisma.userProfileCertificates.createMany({
//         data: [
//             {
//                 profileId: userProfile.id,
//                 institution: 'Driven',
//                 course: 'Desenvolvimento Web FullStack',
//                 link: 'https://e-certificado.com/login/visualizar?c=1463526A67EFCE7B9847830',
//                 workload: 1200
//             },
//             {
//                 profileId: userProfile.id,
//                 institution: 'Dio',
//                 course: 'Angular Framework',
//                 link: 'https://www.dio.me/certificate/FE4EF1DB/share',
//                 workload: 37
//             },
//             {
//                 profileId: userProfile.id,
//                 institution: 'Dio',
//                 course: 'Formação Java',
//                 link: 'https://www.dio.me/certificate/387DD529',
//                 workload: 76
//             },
//             {
//                 profileId: userProfile.id,
//                 institution: 'IBM',
//                 course: 'Agile Explorer',
//                 link: 'https://www.credly.com/badges/9076d838-7fd4-4ce6-a7b2-89ef60dddfd4/linked_in_profile',
//                 workload: 40
//             },
//             {
//                 profileId: userProfile.id,
//                 institution: 'Fundação Estudar',
//                 course: 'CC50: Introdução à Ciência da Computação',
//                 link: 'https://edools-3-production.s3.amazonaws.com/org-6988/school-7227/certificates/enrollment-8670331/course-84414-hcjxs.pdf',
//                 workload: 70
//             },
//         ],
//     });

//     await prisma.userProfileProjects.createMany({
//         data: [
//             {
//                 profileId: userProfile.id,
//                 name: 'Project A',
//                 resume: 'Developed a web application.',
//                 link: 'https://example.com/project1',
//             },
//             {
//                 profileId: userProfile.id,
//                 name: 'Project B',
//                 resume: 'Built a mobile app.',
//                 link: 'https://example.com/project2',
//             },
//         ],
//     });

//     await prisma.userProfileLanguages.createMany({
//         data: [
//             {
//                 profileId: userProfile.id,
//                 language: 'Português',
//                 level: 'Fluente',
//             },
//             {
//                 profileId: userProfile.id,
//                 language: 'English',
//                 level: 'Avançado',
//             },
//             {
//                 profileId: userProfile.id,
//                 language: 'Espanhol',
//                 level: 'Intermediário',
//             },
//         ],
//     });

//     await prisma.userProfileStack.createMany({
//         data: [
//             { profileId: userProfile.id, name: 'Node' },
//             { profileId: userProfile.id, name: 'Java', },
//             { profileId: userProfile.id, name: 'Angular', },
//             { profileId: userProfile.id, name: 'Docker', },
//             { profileId: userProfile.id, name: 'Git', },
//             { profileId: userProfile.id, name: 'Linux', },
//             { profileId: userProfile.id, name: 'Angular', },
//             { profileId: userProfile.id, name: 'Docker', },
//             { profileId: userProfile.id, name: 'Typescript' },
//             { profileId: userProfile.id, name: 'React', },
//             { profileId: userProfile.id, name: 'AWS', },
//             { profileId: userProfile.id, name: 'GraphQL', },
//             { profileId: userProfile.id, name: 'WebSockets', },
//             { profileId: userProfile.id, name: 'Spring Framework', },
//             { profileId: userProfile.id, name: 'Javascript', },
//             { profileId: userProfile.id, name: 'Python', },
//         ],
//     });
// */
// }

// main().catch((e) => {

//     console.log(e);
//     process.exit(1);

// }).finally(async () => await prisma.$disconnect());

