import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';

import {

    HiringProcess,
    ProcessStepsList,
    HiringProcessSteps,
    CreateNewProcessData,
    CreateProcessStepList,
    NewHiringProcessResponse,
    HiringDeveloperSubscriber,
    DeveloperApplyToProcessRequest,

} from '../../models/hiring.js';

import hiringStepsPackage from './steps.js';
import messageService from '../messages/messages.js';
import messageBodyHTMLService from '../messages/html.js';
import hiringRepository from '../../repositories/hiring/index.js';

interface CreateNewProcess {
    user: UserJwtPayload;
    data: Omit<CreateNewProcessData, 'sponsor'>;
};

interface UpdateCandidatesList {
    processId: string;
    recruiterEmail: string;
    candidatesLists: HiringDeveloperSubscriber[]
}

interface UpdateProcess {
    processId: string;
    recruiterEmail: string;
    stepIdentifier: HiringProcessSteps
}

async function updateCandidateList({ recruiterEmail, processId, candidatesLists }: UpdateCandidatesList): Promise<ApiResponse<null>> {

    const process = await hiringRepository.get.byId(processId);

    if (!process) {
        apiErrors.NotFound(appMessageErros.hiring.notFound);
    };

    if (process.sponsor !== recruiterEmail) {
        apiErrors.Unauthorized(appMessageErros.hiring.withoutPermission);
    }

    await hiringRepository.update.steps.list.candidateList(candidatesLists);

    const response: ApiResponse<null> = {
        status: 200,
        message: 'Controle de candidatos atualizado com sucesso!',
    };

    return response;
}

async function createNewStepCandidateList(data: CreateProcessStepList): Promise<ApiResponse<{ newListId: string }>> {

    const process = await hiringRepository.get.byId(data.processId);

    if (!process) {
        apiErrors.NotFound(appMessageErros.hiring.notFound);
    }

    try {

        const { id: newListId } = await hiringRepository.create.steps.stepList(data);

        const response: ApiResponse<{ newListId: string }> = {
            status: 200,
            data: { newListId },
            message: 'Lista de candidatos criada com sucesso!',
        };

        return response;

    } catch (error) {
        console.log(error)
    }
}

async function updateProcessStep({ processId, recruiterEmail, stepIdentifier }: UpdateProcess): Promise<ApiResponse<null>> {

    const process = await hiringRepository.get.byId(processId);

    if (process.sponsor !== recruiterEmail) {
        apiErrors.Unauthorized(appMessageErros.hiring.withoutPermission);
    }

    if (!process) {
        apiErrors.NotFound(appMessageErros.hiring.notFound);
    };

    const currentStep = await hiringRepository.get.steps.currentStep(process.id);

    switch (currentStep.identifier) {

        case 'OPEN_FOR_APPLICATIONS':

            /*
            const currentDate = Date.now().toString();

            if (process.deadline > currentDate) {
                apiErrors.BadRequest(appMessageErros.hiring.openForSubscriptions);
            } */

            await hiringStepsPackage.handleUpdateProcess({
                process,
                listIdentifiers: ['SUBSCRIBERS', 'OTHER'], // lista de candidatos que será copiada para a próxima etapa
                newStepIdentifier: stepIdentifier,
                currentStepIdenfier: currentStep.identifier,
            })

            break;

        case 'PROCESS_COMPLETED':
            // ultima etapa do processo
            await hiringRepository.update.steps.currentStep(process.id, 'PROCESS_COMPLETED');
            break;

        case 'CANCELLED':
            // tem que notificar todo mundo ... a empresa e os candidatos ... mensagem ..
            await hiringRepository.update.steps.currentStep(process.id, 'CANCELLED');
            break;

        case 'FROZEN':
            break;

        default:

            await hiringStepsPackage.handleUpdateProcess({
                process,
                listIdentifiers: ['QUALIFIED'], // apenas candidatos na lista dos qualificados irão prosseguir
                newStepIdentifier: stepIdentifier,
                currentStepIdenfier: currentStep.identifier,
            })

            break;
    }

    const response: ApiResponse<null> = {
        status: 200,
        message: 'Processo seletivo atualizado com sucesso!',
    };

    return response;
}

async function createProcess({ data, user: { profileId, email, accountId } }: CreateNewProcess): Promise<ApiResponse<NewHiringProcessResponse>> {

    const newProcessResponse = await hiringRepository.create.process({
        profileId,
        data: {
            ...data,
            sponsor: email
        }
    });

    const bodyHTML = messageBodyHTMLService.newHiringProcessMessage({
        title: data.title,
        seniority: data.seniority
    })

    await messageService.sendNewMessage({
        bodyHTML,
        severity: 'INFO',
        category: 'UPDATES',
        provider: 'DEVJOBS',
        receiverEmail: email,
        senderEmail: 'DevJobs',
        receiverAccountId: accountId,
        subject: 'Novo processo seletivo iniciado',
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

    const { accountId } = candidate;

    const subscribersList = currentStep.candidatesLists.find(list => list.identifier === 'SUBSCRIBERS');

    const alreadyRegistered = subscribersList.candidates.find(candidate => candidate.accountId === accountId);

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
        apiErrors.Conflict(appMessageErros.hiring.registrationsClosed);
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
    updateProcessStep,
    updateCandidateList,
    createNewStepCandidateList,
    getCompanyHiringProcessList,
};

export default hiringService; 