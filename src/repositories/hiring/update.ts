import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import { ApplyNewCandidate, HiringProcess } from '../../models/hiring.js';

interface UpdateSubscribersCount {
    id: HiringProcess['id'],
    subscribersCount: HiringProcess['subscribersCount']
}

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
};

export default updateHiringProcessPackage;