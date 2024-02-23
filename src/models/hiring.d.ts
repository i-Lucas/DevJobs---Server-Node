export type HiringProcessSteps =
    | 'OPEN_FOR_APPLICATIONS'   // Vaga aberta para candidaturas
    | 'RESUME_SCREENING'        // Triagem inicial de currículos
    | 'INTERVIEW_SELECTION'     // Seleção de candidatos para entrevistas
    | 'INITIAL_INTERVIEWS'      // Entrevistas iniciais
    | 'TECHNICAL_ASSESSMENT'    // Avaliação técnica ou desafio de programação
    | 'FINAL_INTERVIEWS'        // Entrevistas finais
    | 'BEHAVIORAL_ASSESSMENT'   // Avaliação de habilidades comportamentais
    | 'PROJECT_CHALLENGE'       // Desafio de projeto ou prático
    | 'MANAGER_INTERVIEWS'      // Entrevistas com líderes ou gestores
    | 'REFERENCE_CHECK'         // Verificação de referências
    | 'JOB_OFFER'               // Oferta de emprego
    | 'PROCESS_COMPLETED'       // Processo de contratação concluído
    | 'CANCELLED'               // Processo de contratação cancelado
    | 'FROZEN';                 // Processo de contratação congelado ou suspenso temporariamente

export interface HiringProcess {

    id?: string;

    title: string;
    description: string;
    category: string;
    seniority: string;

    differences: string[];
    stacklist: string[];
    requirements: string[];
    benefits: string[];

    salaryRange: string;
    negotiable: boolean;

    contractType: string;
    locationType: string;
    workload: string;
    deadline: string;
    pcd: boolean;

    recruiter: string

    steps: ProcessStepsList[];
    subscribersCount: number;

    createdAt: string;
    updatedAt: string;
}

export interface ProcessStepsList {

    id?: string;

    identifier: HiringProcessSteps;
    hiringProcessId?: string;  // database
    candidatesLists: HiringProcessStepLists[]

    createdAt: string;
    updatedAt: string;
}

export interface HiringProcessStepLists {

    id?: string;

    name: string;
    description: string;
    processStepId?: string; // database
    candidates: HiringDeveloperSubscriber[];

    createdAt: string;
    updatedAt: string;
}

export interface HiringDeveloperSubscriber {

    id?: string;

    name: string;
    picture: string;
    userId: string;
    profileId: string;
    processStepListId?: string; // database

    createdAt: string;
    updatedAt: string;
}

// ---------------------------------------------------------------------------------------------------------------------

export type CreateNewProcessData = Omit<
    HiringProcess,
    'id' |
    'steps' |
    'subscribersCount' |
    'createdAt' |
    'updatedAt'
>;

interface NewHiringProcessResponse {

    stepId: string;
    processId: string;
    recruiter: string;

    defaultLists: {
        qualifiedListId: string;
        subscribersListId: string;
    }
}

// ---------------------------------------------------------------------------------------------------------------------

export interface DeveloperApplyToProcessRequest {

    processId: string;
    candidate: Omit<HiringDeveloperSubscriber, 'createdAt' | 'updatedAt'>;
}

export interface ApplyNewCandidate {

    candidate: Omit<HiringDeveloperSubscriber, 'createdAt' | 'updatedAt'>;
    processStepListId: ProcessStepsList['id'];
}

export interface JobOfferData {

    company: {

        name: string;
        profile: string;
        picture: string;
    },

    offer: {

        id: string;
        title: string;
        workload: string; // full-time / meio-período
        location: string; // localização da vaga ( remota ou localização da empresa )

        seniority: string;
        category: string;
        contractType: string;
        salaryRange: string;
        description: string;
        benefits: string[];
        stacklist: string[];
        differences: string[];
        requirements: string[];

        createdAt: string;
        updatedAt: string;
    }
}