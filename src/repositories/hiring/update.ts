import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import {
    HiringProcess,
    HiringProcessSteps,
    HiringDeveloperSubscriber,

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

async function updateSubscribersCount({ id, subscribersCount }: UpdateSubscribersCount) {

    await db.hiringProcess.update({

        where: { id },
        data: {

            subscribersCount: subscribersCount + 1
        }
    })
}

async function updateCandidateList(candidates: HiringDeveloperSubscriber[]) {

    const now = utils.now();

    for (const candidate of candidates) {

        await db.hiringDeveloperSubscriber.update({
            where: {
                id: candidate.id
            },
            data: {
                ...candidate,
                updatedAt: now
            }
        });
    }
}


const updateHiringProcessPackage = {
    updateCandidateList,
    updateSubscribersCount,
    updateProcessCurrentStep,
};

export default updateHiringProcessPackage;