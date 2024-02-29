interface NewHiringProcessMessageData {
    title: string,
    seniority: string
}

function welcomeMessageForCompany(name: string) {

    return `
        <div>
            <h1>Bem-vindo(a) ao DevJobs!</h1>
            <p>Sua empresa agora faz parte da maior plataforma de recrutamento e gerenciamento de processos seletivos do Brasil!</p>
            <p>Aqui, oferecemos um conjunto abrangente de ferramentas para otimizar seu processo de contratação.</p>
            <p>Com nossas ferramentas avançadas de gerenciamento de candidatos, você pode facilmente acompanhar o progresso das suas vagas e gerenciar os candidatos de forma intuitiva e eficiente.</p>
            <p>Além disso, fornecemos insights valiosos por meio de estatísticas detalhadas, permitindo que você tome decisões informadas ao encontrar os melhores talentos para suas vagas.</p>
            <p>Acompanhe as estatísticas da sua empresa, encontre os melhores candidatos para suas vagas e simplifique seu processo seletivo conosco!</p>
            <p>Fique atento(a) às novidades e recursos que disponibilizamos para otimizar seu processo de contratação.</p>
            <p>Seja bem-vindo(a) e aproveite ao máximo sua experiência conosco!</p>
            <p>Atenciosamente, DevJobs</p>
        </div>
    `;
}

function welcomeMessageForDeveloper(name: string) {

    // <strong>${name}</strong>

    return `
        <div>
            <h1>Bem-vindo(a) ao DevJobs!</h1>
            <p>Você acaba de entrar para a maior plataforma de recrutamento e gerenciamento de processos seletivos do Brasil!</p>
            <p>Aqui, conectamos talentos como você às melhores oportunidades de emprego na área do desenvolvimento.</p>                                
            <p>Além disso, oferecemos ferramentas poderosas para acompanhar suas candidaturas e simplificar seu processo de busca por emprego.</p>
            <p>Fique atento(a) às novidades e oportunidades que compartilhamos diariamente.</p>
            <p>Seja bem-vindo(a) e boa sorte em sua jornada conosco!</p>
            <p>Atenciosamente, DevJobs</p>
        </div>
    `;
}

function newHiringProcessMessage({ title, seniority }: NewHiringProcessMessageData) {

    return `
        <div>
            <h1>Parabéns, aqui começa uma nova etapa!</h1>
            <p>Você acabou de iniciar um novo processo seletivo para a posição de ${title}</p>
            <p>Instruções para gerenciar o processo ...</p>
        </div>
    `
}

const messageBodyHTMLService = {
    newHiringProcessMessage,
    welcomeMessageForCompany,
    welcomeMessageForDeveloper
}

export default messageBodyHTMLService;