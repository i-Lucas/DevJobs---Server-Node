import { CandidateStatus, HiringProcessSteps } from './hiring.js';

export interface GetUserApplicationsResponse {

    title: string;
    company: string;
    category: string;
    seniority: string;

    processId: string;

    status: CandidateStatus;
    currentStep: HiringProcessSteps;

    createdAt: string;
    updatedAt: string;
}