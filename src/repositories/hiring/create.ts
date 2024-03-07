import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import {
    ProcessStepsList,
    CreateNewProcessData,
    NewHiringProcessResponse,
    HiringDeveloperSubscriber,
    ProcessStepListIdentifier,

} from '../../models/hiring.js';

interface CreateNewProcess {
    profileId: string;
    data: CreateNewProcessData
}

interface CreateProcessStep {

    hiringProcessId: string;
    identifier: ProcessStepsList['identifier'];
}

interface CreateProcessStepList {

    name: string;
    description: string;
    processStepId: string;
    identifier: ProcessStepListIdentifier;
}

async function fillCandidatesList(updatedCandidates: HiringDeveloperSubscriber[]) {

    const candidatesWithoutIds = updatedCandidates.map(candidate => {
        const { id, ...rest } = candidate; // Desestrutura o objeto e remove o id
        return rest;
    });

    await db.hiringDeveloperSubscriber.createMany({
        data: candidatesWithoutIds
    });
}

async function createProcessStepList({ name, description, identifier, processStepId }: CreateProcessStepList) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.processStepList.create({

        data: {

            name,
            description,
            identifier,
            processStepId,

            ...createdAtAndUpdatedAt,
        }
    })
}

async function createProcessStep({ hiringProcessId, identifier }: CreateProcessStep) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.processStep.create({

        data: {

            identifier,
            hiringProcessId,
            ...createdAtAndUpdatedAt,
        }
    })

    /*
    return await db.hiringProcess.update({
        where: {
            id: processId
        },
        data: {
            steps: {
                create: {
                    identifier: stepIdentifier,
                    ...createdAtAndUpdatedAt,
                }
            }
        }
    })
    */
};

async function newHiringProcess({ data, profileId }: CreateNewProcess): Promise<NewHiringProcessResponse> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    const { id: companyProfileId } = await db.companyProfile.findUnique({
        where: {
            id: profileId
        }
    })

    const { id: hiringProcessId } = await db.hiringProcess.create({

        data: {
            ...data,
            companyProfileId,
            subscribersCount: 0,
            ...createdAtAndUpdatedAt,
            currentStep: 'OPEN_FOR_APPLICATIONS',
        }
    })

    const { id: processStepId } = await createProcessStep({
        hiringProcessId,
        identifier: 'OPEN_FOR_APPLICATIONS',
    })

    /*
    const { id: processStepId } = await db.processStep.create({

        data: {

            identifier: 'OPEN_FOR_APPLICATIONS',
            hiringProcessId,

            ...createdAtAndUpdatedAt,
        }
    })
    */

    const { id: subscribersListId } = await createProcessStepList({
        processStepId,
        name: 'Inscritos',
        identifier: 'SUBSCRIBERS',
        description: 'Lista dos candidatos que se inscreveram na vaga.',
    });

    const { id: favoritesListId } = await createProcessStepList({
        processStepId,
        name: 'Favoritos',
        identifier: 'OTHER',
        description: 'Exemplo de lista personalizada de candidatos favoritos',
    });

    /*
    const { id: subscribersListId } = await db.processStepList.create({

        data: {

            name: 'Inscritos',
            description: 'Lista dos candidatos inscritos na vaga.',
            processStepId,

            ...createdAtAndUpdatedAt,
        }
    })

    const { id: favoritesListId } = await db.processStepList.create({

        data: {

            name: 'Favoritos',
            description: 'Exemplo de lista personalizada de candidatos favoritos',
            processStepId,

            ...createdAtAndUpdatedAt,
        }
    }) 
    */

    return {

        stepId: processStepId,
        recruiter: data.recruiter,
        processId: hiringProcessId,
        defaultLists: {
            favoritesListId,
            subscribersListId,
        }
    };
}

const createHiringProcessPackage = {
    newHiringProcess,
    createProcessStep,
    fillCandidatesList,
    createProcessStepList,
};

export default createHiringProcessPackage;