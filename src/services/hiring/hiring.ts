import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';

import utils from '../../utils/appUtils.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';

import {

    HiringProcess,
    ProcessStepsList,
    HiringProcessSteps,
    CreateNewProcessData,
    NewHiringProcessResponse,
    ProcessStepListIdentifier,
    DeveloperApplyToProcessRequest,

} from '../../models/hiring.js';

import messageService from '../messages/messages.js';
import messageBodyHTMLService from '../messages/html.js';
import hiringRepository from '../../repositories/hiring/index.js';

interface CreateNewProcess {
    user: UserJwtPayload;
    data: Omit<CreateNewProcessData, 'recruiter'>;
};

interface HandleUpdateProcessWhenFirstStep {
    process: HiringProcess;
    newStepIdentifier: HiringProcessSteps;
    currentStepIdenfier: HiringProcessSteps;
    listIdentifier: ProcessStepListIdentifier;
}

async function handleUpdateProcess({ process, currentStepIdenfier, newStepIdentifier, listIdentifier }: HandleUpdateProcessWhenFirstStep) {

    const { candidatesLists: allLists } = await hiringRepository.get.steps.candidatesList(process.id, currentStepIdenfier);

    const subscribersList = allLists.find(list => list.identifier === listIdentifier);

    /*
    if (subscribersList.candidates.length === 0) {
        apiErrors.BadRequest(appMessageErros.hiring.noCandidate); // ótimo
    }
    */

    const newStep = await hiringRepository.create.steps.step({
        hiringProcessId: process.id,
        identifier: newStepIdentifier
    });

    await hiringRepository.update.steps.currentStep(process.id, newStepIdentifier);

    const newStepSubscribersList = await hiringRepository.create.steps.stepList({
        processStepId: newStep.id,
        name: 'Candidatos',
        identifier: 'CANDIDATES',
        description: 'Lista dos candidatos concorrentes na vaga.',
    });

    const candidates = subscribersList.candidates;
    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        ...createdAtAndUpdatedAt,
        processStepListId: newStepSubscribersList.id,
    }));

    await hiringRepository.create.steps.fillCandidatesList(updatedCandidates);

    await hiringRepository.create.steps.stepList({
        processStepId: newStep.id,
        name: 'Qualificados',
        identifier: 'QUALIFIED',
        description: 'Lista dos candidatos qualificados para a próxima etapa.',
    });
}

async function updateProcessStep(processId: string, stepIdentifier: HiringProcessSteps): Promise<ApiResponse<null>> {

    const process = await hiringRepository.get.byId(processId);

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

            await handleUpdateProcess({
                process,
                listIdentifier: 'SUBSCRIBERS', // lista de candidatos que será copiada para a próxima etapa
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

            await handleUpdateProcess({
                process,
                listIdentifier: 'QUALIFIED', // apenas candidatos na lista dos qualificados irão prosseguir
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
            recruiter: email
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

    const { userId: candidateId } = candidate;

    const subscribersList = currentStep.candidatesLists.find(list => list.identifier === 'SUBSCRIBERS');

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
    updateProcessStep,
    getCompanyHiringProcessList,
};

export default hiringService; 