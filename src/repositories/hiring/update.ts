import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import {
    HiringProcess,
    ApplyNewCandidate,
    HiringProcessSteps,
} from '../../models/hiring.js';

interface UpdateSubscribersCount {
    id: HiringProcess['id'],
    subscribersCount: HiringProcess['subscribersCount']
}

async function updateProcessCurrentStep(processId: string, newCurrentStep: HiringProcessSteps) {

    const updatedAt = utils.now();

    await db.hiringProcess.update({
        where: {
            id: processId
        },
        data: {
            updatedAt,
            currentStep: newCurrentStep,
        }
    })
}

/*
async function updateCandidates(processStepListId: string, newStepSubscribersListId: string) {

    return await db.hiringDeveloperSubscriber.updateMany({

        where: {
            processStepListId
        },
        data: {
            processStepListId: newStepSubscribersListId
        }
    })
}
*/

async function updateSubscribersCount({ id, subscribersCount }: UpdateSubscribersCount) {

    await db.hiringProcess.update({

        where: { id },
        data: {

            subscribersCount: subscribersCount + 1
        }
    })
}

async function applyNewCandidate({ processStepListId, candidate }: ApplyNewCandidate) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    await db.hiringDeveloperSubscriber.create({

        data: {

            ...candidate,
            processStepListId,
            ...createdAtAndUpdatedAt,
        }
    })
};

const updateHiringProcessPackage = {
    applyNewCandidate,
    updateSubscribersCount,
    updateProcessCurrentStep,
};

export default updateHiringProcessPackage;