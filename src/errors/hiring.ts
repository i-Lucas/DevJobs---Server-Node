export interface HiringMessageErrors {

    frozen: string;
    notFound: string;
    cancelled: string;
    noCandidate: string;
    alreadyRegistered: string;
    registrationsClosed: string;
    openForSubscriptions: string;

    jobOffer: {

        invalidId: string;
        notFound: string;
    }
}

export const hiringMessageErrors: HiringMessageErrors = {

    cancelled: 'Processo seletivo encerrado.',
    notFound: 'Processo seletivo não encontrado.',
    registrationsClosed: 'Inscrições encerradas.',
    frozen: 'Processo seletivo suspenso temporariamente.',
    alreadyRegistered: 'Você já se inscreveu nesse processo.',
    openForSubscriptions: 'O prazo para inscrições ainda não acabou.',
    noCandidate: 'Nenhum candidato está inscrito ou qualificado para a próxima etapa.',

    jobOffer: {

        invalidId: 'Identificador inválido.',
        notFound: 'Vaga não encontrada.'
    }
}