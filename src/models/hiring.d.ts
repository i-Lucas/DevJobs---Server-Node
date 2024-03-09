import { CompanyProfile } from './profile/company.profile.js';

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
    pcdType: string;

    sponsor: string;
    rhEmail: string;

    subscribersCount: number;
    steps: ProcessStepsList[];
    currentStep: HiringProcessSteps;

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

export type ProcessStepListIdentifier = 'SUBSCRIBERS' | 'QUALIFIED' | 'CANDIDATES' | 'FAVORITES' | 'OTHER';
export interface HiringProcessStepLists {

    id?: string;

    name: string;
    description: string;

    processStepId?: string; // database
    identifier: ProcessStepListIdentifier;
    candidates: HiringDeveloperSubscriber[];

    createdAt: string;
    updatedAt: string;
}

export interface HiringDeveloperSubscriber {

    id?: string;

    name: string;
    picture: string;

    email: string;
    profileId: string;
    accountId: string;

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
        favoritesListId: string;
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

export interface JobOfferResponse {

    count: number;
    offers: JobOfferData[],
}

// ---------------------------------------------------------------------------------------------------------- repository

export interface CreateProcessStepList {

    name: string;
    processId?: string;
    description: string;
    processStepId: string;
    identifier: ProcessStepListIdentifier;
}