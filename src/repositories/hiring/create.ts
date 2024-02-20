import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import { CreateNewProcessData, NewHiringProcessResponse, ProcessStepsList } from '../../models/hiring.js';

interface CreateNewProcess {
    accountId: string;
    data: CreateNewProcessData
}

async function newHiringProcess({ data, accountId }: CreateNewProcess): Promise<NewHiringProcessResponse> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    const { id: hiringProcessId } = await db.hiringProcess.create({

        data: {
            ...data,
            accountId,
            subscribersCount: 0,
            ...createdAtAndUpdatedAt,
        }
    })

    const { id: processStepId } = await db.processStep.create({

        data: {

            identifier: 'OPEN_FOR_APPLICATIONS',
            hiringProcessId,

            ...createdAtAndUpdatedAt,
        }
    })

    const { id: subscribersListId } = await db.processStepList.create({

        data: {

            name: 'Inscritos',
            description: 'Lista dos candidatos inscritos na vaga.',
            processStepId,

            ...createdAtAndUpdatedAt,
        }
    })

    const { id: qualifiedListId } = await db.processStepList.create({

        data: {

            name: 'Qualificados',
            description: 'Lista dos candidatos qualificados para a próxima etapa.',
            processStepId,

            ...createdAtAndUpdatedAt,
        }
    })

    return {

        stepId: processStepId,
        recruiter: data.recruiter,
        processId: hiringProcessId,
        defaultLists: {
            qualifiedListId,
            subscribersListId,
        }
    };
}

const createHiringProcessPackage = {
    newHiringProcess
};

export default createHiringProcessPackage;