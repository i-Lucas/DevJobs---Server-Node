import utils from '../../utils/appUtils.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';

import {

    HiringProcess,
    CandidateStatus,
    ProcessStepsList,
    HiringProcessSteps,
    HiringProcessStepLists,
    ProcessStepListIdentifier,
    HiringDeveloperSubscriber,

} from '../../models/hiring.js';

import messageService from '../messages/messages.js';
import messageBodyHTMLService from '../messages/html.js';
import { MessageSeverity } from '../../models/messages.js';
import hiringRepository from '../../repositories/hiring/index.js';
import applicationsRepository from '../../repositories/applications/applications.js';

interface HandleUpdateProcessStep {

    process: HiringProcess;
    newStepIdentifier: HiringProcessSteps;
    currentStepIdenfier: HiringProcessSteps;
    listIdentifiers: ProcessStepListIdentifier[];
}

interface SendMessageData {

    messageBody: string;
    process: HiringProcess;
    severity: MessageSeverity
    candidates: HiringDeveloperSubscriber[];
}

async function handleUpdateProcess({ process, currentStepIdenfier, newStepIdentifier, listIdentifiers }: HandleUpdateProcessStep): Promise<ProcessStepsList> {

    const { candidatesLists: allLists } = await hiringRepository.get.steps.candidatesList(process.id, currentStepIdenfier);

    const { allCandidates, allFavorites, notApprovedCandidates } = await extractCandidateLists(allLists, listIdentifiers);

    if (allCandidates.length === 0 && allFavorites.length === 0) {
        apiErrors.BadRequest(appMessageErros.hiring.noCandidates);
    }

    const newStep = await createNewStep(process, newStepIdentifier);

    const newStepSubscribersList = await createCandidatesList(newStep.id);
    await fillCandidateList(newStepSubscribersList.id, allCandidates);

    const newStepFavoritesList = await createFavoritesCandidatesList(newStep.id);
    await fillCandidateList(newStepFavoritesList.id, allFavorites);

    await createNextStepQualifiedsCandidatesList(newStep.id);

    const allApprovedCandidates: HiringDeveloperSubscriber[] = [...allCandidates, ...allFavorites];

    await sendMessageToApprovedCandidates(process, allApprovedCandidates);
    await sendMessageToNotApprovedCandidates(process, notApprovedCandidates);

    await updateCandidateStatus(allApprovedCandidates, {
        processId: process.id,
        currentStep: newStep.identifier,
        status: 'APPROVED_FOR_NEXT_STAGE',
    });

    await updateCandidateStatus(notApprovedCandidates, {
        processId: process.id,
        currentStep: newStep.identifier,
        status: 'REPROVED',
    });

    const sendNewStep = await hiringRepository.get.steps.getStepById(newStep.id)
    return sendNewStep;
}

async function extractCandidateLists(allLists: HiringProcessStepLists[], listIdentifiers: ProcessStepListIdentifier[]) {

    const allCandidates: HiringDeveloperSubscriber[] = [];
    const allFavorites: HiringDeveloperSubscriber[] = [];
    const notApprovedCandidates: HiringDeveloperSubscriber[] = [];

    for (const listIdentifier of listIdentifiers) {

        const subscribersList = allLists.find(list => list.identifier === listIdentifier);
        if (subscribersList && subscribersList.candidates.length > 0) {
            allCandidates.push(...subscribersList.candidates);
        }
    }

    const favoritesList = allLists.find(list => list.identifier === 'FAVORITES');
    if (favoritesList && favoritesList.candidates.length > 0) {
        allFavorites.push(...favoritesList.candidates);
    }

    const notApprovedLists = allLists.filter(list => list.identifier !== 'FAVORITES' && !listIdentifiers.includes(list.identifier));

    notApprovedLists.forEach(list => {
        if (list.candidates.length > 0) {
            notApprovedCandidates.push(...list.candidates);
        }
    });

    return {
        allCandidates,
        allFavorites,
        notApprovedCandidates
    }
};

async function createNewStep(process: HiringProcess, newStepIdentifier: HiringProcessSteps) {

    const newStep = await hiringRepository.create.steps.step({
        hiringProcessId: process.id,
        identifier: newStepIdentifier
    });

    await hiringRepository.update.steps.currentStep(process.id, newStepIdentifier);
    return newStep;
};

interface UpdateCandidateStatus {

    processId: string;
    status: CandidateStatus;
    currentStep: HiringProcessSteps;
}

async function updateCandidateStatus(candidates: HiringDeveloperSubscriber[], data: UpdateCandidateStatus) {

    const updatePromises = candidates.map(async (candidate) => {

        await applicationsRepository.updateCandidateStauts({
            ...data,
            accountId: candidate.accountId
        })
    })

    await Promise.all(updatePromises);
}

async function sendMessages({ candidates, severity, process, messageBody }: SendMessageData) {

    const messagePromises = candidates.map(async (candidate) => {

        await messageService.sendNewMessage({
            severity,
            category: 'UPDATES',
            provider: 'COMPANY',
            bodyHTML: messageBody,
            senderEmail: process.rhEmail,
            receiverEmail: candidate.email,
            receiverAccountId: candidate.accountId,
            subject: `Atualização Processo Seletivo - Vaga ${process.title}`,
        });

    });

    await Promise.all(messagePromises);
};

async function fillCandidateList(candidateListId: string, candidates: HiringDeveloperSubscriber[]) {

    if (candidates.length === 0) return;

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        ...createdAtAndUpdatedAt,
        processStepListId: candidateListId,
    }));

    await hiringRepository.create.steps.fillCandidatesList(updatedCandidates);
};

async function createFavoritesCandidatesList(processStepId: string) {

    return await hiringRepository.create.steps.stepList({
        processStepId,
        name: 'Favoritos',
        identifier: 'FAVORITES',
        description: 'Lista dos candidatos favoritos da etapa anterior.',
    });
}

async function createNextStepQualifiedsCandidatesList(processStepId: string) {

    await hiringRepository.create.steps.stepList({
        processStepId,
        name: 'Qualificados',
        identifier: 'QUALIFIED',
        description: 'Lista dos candidatos qualificados para a próxima etapa.',
    });
};

async function createCandidatesList(processStepId: string) {

    return await hiringRepository.create.steps.stepList({
        processStepId,
        name: 'Candidatos',
        identifier: 'CANDIDATES',
        description: 'Lista dos candidatos concorrentes na vaga.',
    });
}

async function sendMessageToApprovedCandidates(process: HiringProcess, candidateList: HiringDeveloperSubscriber[]) {

    // messageBodyHTMLService  ...
    const approvedMessageBodyHTML = `Você foi aprovado para a próxima etapa do processo ${process.title} !`

    await sendMessages({
        process,
        severity: 'SUCCESS',
        candidates: candidateList,
        messageBody: approvedMessageBodyHTML,
        // candidateStatus: 'APPROVED_FOR_NEXT_STAGE'
    })
}

async function sendMessageToNotApprovedCandidates(process: HiringProcess, candidateList: HiringDeveloperSubscriber[]) {

    const reprovedMessageBodyHTML = `Infelizmente você não foi aprovado para a vaga ${process.title} !`

    await sendMessages({
        process,
        severity: 'INFO',
        candidates: candidateList,
        messageBody: reprovedMessageBodyHTML,
        // candidateStatus: 'REPROVED'
    })
}

const hiringStepsPackage = {
    handleUpdateProcess
}

export default hiringStepsPackage;