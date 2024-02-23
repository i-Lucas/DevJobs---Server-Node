export interface HiringMessageErrors {

    frozen: string;
    notFound: string;
    cancelled: string;
    alreadyRegistered: string;
    registrationsClosed: string;

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

    jobOffer: {

        invalidId: 'Identificador inválido.',
        notFound: 'Vaga não encontrada.'
    }
}