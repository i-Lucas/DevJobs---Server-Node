import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';

import {

    HiringProcess,
    ProcessStepsList,
    CreateNewProcessData,
    NewHiringProcessResponse,
    DeveloperApplyToProcessRequest,

} from '../../models/hiring.js';

import hiringRepository from '../../repositories/hiring/index.js';

interface CreateNewProcess {
    user: UserJwtPayload;
    data: Omit<CreateNewProcessData, 'recruiter'>;
};

async function createProcess({ data, user: { profileId, email } }: CreateNewProcess) {

    const newProcessResponse = await hiringRepository.create.process({
        profileId,
        data: {
            ...data,
            recruiter: email
        }
    })

    const response: ApiResponse<NewHiringProcessResponse> = {
        status: 201,
        data: newProcessResponse,
        message: 'Processo seletivo iniciado com sucesso!',
    };

    return response;
};

async function getCompanyHiringProcessList(userJwtProfileId: string): Promise<ApiResponse<{ processList: HiringProcess[] }>> {

    const processList = await hiringRepository.get.allCompanyProcess(userJwtProfileId);

    if (processList.length === 0) {

        return {
            status: 200,
            message: 'Nenhum processo seletivo foi encontrado.',
        }
    }

    return {

        status: 200,
        data: { processList },
        message: 'Processos seletivos encontrados com sucesso!',
    }
}

async function applyToProcess({ candidate, processId }: DeveloperApplyToProcessRequest): Promise<ApiResponse<any>> {

    const process = await hiringRepository.get.byId(processId);

    if (!process) {
        apiErrors.NotFound(appMessageErros.hiring.notFound);
    }

    const currentStep = process.steps.pop();
    checkIfProcessIsApplicableOrThrow(currentStep);

    const { userId: candidateId } = candidate;

    const subscribersList = currentStep.candidatesLists.find(list => list.name === 'Inscritos'); // fragile

    const alreadyRegistered = subscribersList.candidates.find(candidate => candidate.userId === candidateId);

    if (alreadyRegistered) {
        apiErrors.Conflict(appMessageErros.hiring.alreadyRegistered);
    }

    await hiringRepository.update.apply({
        candidate,
        processStepListId: subscribersList.id,
    });

    await hiringRepository.update.subsCount({
        id: process.id,
        subscribersCount: process.subscribersCount
    });

    const response: ApiResponse<null> = {
        status: 200,
        message: 'Inscrição efetuada com sucesso !',
    }

    return response;
};

function checkIfProcessIsApplicableOrThrow(step: Omit<ProcessStepsList, 'candidatesLists'>) {
    checkProcessHasClosed(step);
    checkProcessHasFrozen(step);
    checkProcessHasCanceled(step);
};

function checkProcessHasClosed(step: Omit<ProcessStepsList, 'candidatesLists'>) {
    if (step.identifier !== 'OPEN_FOR_APPLICATIONS') {
        apiErrors.Unauthorized(appMessageErros.hiring.registrationsClosed);
    }
}

function checkProcessHasFrozen(step: Omit<ProcessStepsList, 'candidatesLists'>) {
    if (step.identifier === 'FROZEN') {
        apiErrors.Conflict(appMessageErros.hiring.frozen);
    }
}

function checkProcessHasCanceled(step: Omit<ProcessStepsList, 'candidatesLists'>) {
    if (step.identifier === 'CANCELLED') {
        apiErrors.Conflict(appMessageErros.hiring.cancelled);
    }
}

const hiringService = {
    createProcess,
    applyToProcess,
    getCompanyHiringProcessList,
};

export default hiringService; 