interface HiringData {

    title: string;
    description: string;
    category: string;
    seniority: string;
    salaryRange: string;
    negotiable: boolean,
    contractType: string;
    locationType: string;
    workload: string;
    deadline: string;
    pcd: boolean,
}

function getDatePlusThreeDaysInMillis(days: number): number {

    const currentDate = new Date();
    const datePlusThreeDays = new Date(currentDate);
    datePlusThreeDays.setDate(currentDate.getDate() + days);
    return datePlusThreeDays.getTime();
}

const hiringMockModule = {
    newHiringProcess,
    getDatePlusThreeDaysInMillis
}

export default hiringMockModule

function newHiringProcess(data: HiringData) {

    return {

        title: data.title,
        description: data.description,
        category: data.category,
        seniority: data.seniority,
        salaryRange: data.salaryRange,
        negotiable: data.negotiable,
        contractType: data.contractType,
        locationType: data.locationType,
        workload: data.workload,
        deadline: data.deadline,
        pcd: data.pcd,

        benefits: [
            "Home Office",
            "Auxílio Creche",
            "Seguro de Vida",
            "Ajuda de Custo",
            "Horário Flexível",
            "Plano de Carreira",
            "Assistência Médica",
            "Plano Odontológico",
            "Desconto em Farmácia",
            "Programas de Mentoria",
            "Licença Sem Vencimento",
            "Day Off no Aniversário",
            "Horário de Trabalho Flexível",
            "Café e Lanches no Escritório",
            "Benefícios de Academia (Gympass)",
            "Cultura Organizacional Inovadora",
            "Vale Transporte em Cartão Flexível",
            "Eventos e Atividades de Integração",
            "Programas de Bem-Estar no Trabalho",
            "Bolsa de 90% para Estudos de Idiomas",
            "Desenvolvimento Profissional Contínuo",
            "Descontos em Graduações e Pós-graduações",
            "Licença Maternidade/Paternidade Estendida",
            "Participação nos Lucros e Resultados (PLR)",
            "Cursos e Treinamentos Subsidiados pela Empresa",
            "Auxílio Home Office (Ergonomia e Equipamentos)",
            "Assinatura de Plataformas de Aprendizado Online",
        ],
        differences: [
            "Proatividade",
            "Certificação Scrum",
            "Conhecimento em microservices",
            "Pensamento crítico e analítico",
            "Conhecimento em práticas DevOps",
            "Implementação de pipelines CI/CD",
            "Habilidade de aprendizado rápido",
            "Participação em projetos open source",
            "Certificações em segurança, como CISSP",
            "Pós-graduação ou certificações relevantes",
            "Histórico de resolução eficaz de problemas",
            "Experiência em liderança técnica de equipes",
            "Experiência comprovada em projetos relevantes",
            "Experiência em empresas de tecnologia renomadas",
            "Experiência em práticas de segurança cibernética",
            "Boas habilidades de comunicação verbal e escrita",
            "Design e implementação de arquiteturas escaláveis",
            "Experiência em processamento e análise de big data",
            "Experiência com ferramentas como Docker, Kubernetes",
            "Experiência prática em métodos ágeis (Scrum, Kanban)",
            "Conhecimento em React Native, Flutter, Swift, Kotlin",
            "Contribuições regulares para repositórios open source",
            "Experiência em desenvolvimento mobile (iOS, Android)",
            "Certificações relevantes para as tecnologias utilizadas",
            "Participação em hackathons ou competições de programação",
            "Experiência em trabalho colaborativo em equipes distribuídas",
            "Experiência em arquiteturas de nuvem (AWS, Azure, Google Cloud)",
            "Experiência avançada em linguagens como JavaScript, Python, Java, C#",
            "Conhecimento em frameworks de machine learning como TensorFlow, PyTorch",
            "Participação ativa em meetups, conferências e grupos de desenvolvedores",
            "Graduação em Ciência da Computação, Engenharia de Software, ou área relacionada",
            "Conhecimento profundo em frameworks populares como React, Angular, Vue.js, Django, Flask, Spring Boot, etc.",
        ],
        requirements: [
            "Capacidade de análise crítica",
            "Experiência com liderança de projetos",
            "Conhecimento em boas práticas de ITIL",
            "Experiência em arquitetura de sistemas",
            "Conhecimento em automação de processos",
            "Certificações relevantes para a área de atuação",
            "Conhecimento avançado em resolução de problemas",
            "Habilidades avançadas em programação e desenvolvimento",
        ],
        stacklist: [
            "Vue",
            "HTML",
            "CSS",
            "Babel",
            "React",
            "Ember",
            "Svelte",
            "jQuery",
            "Webpack",
            "Angular",
            "Backbone",
            "Bootstrap",
            "JavaScript",
            "TypeScript",
            "Tailwind CSS",
        ]

    }
}