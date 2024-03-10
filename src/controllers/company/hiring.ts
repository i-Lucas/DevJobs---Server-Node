import { Request, Response } from 'express';

import { UserJwtPayload } from '../../models/user.js';

import hiringService from '../../services/hiring/hiring.js';

async function changeHiringProcessStep(req: Request, res: Response) {

    const { email: recruiterEmail }: UserJwtPayload = res.locals.user;

    const { processId, stepIdentifier } = req.body;

    // await new Promise((resolve) => setTimeout(resolve, 700));

    const response = await hiringService.updateProcessStep({
        processId,
        recruiterEmail,
        stepIdentifier,
    });

    return res.status(response.status).json(response);
}

async function startHiringProcess(req: Request, res: Response) {

    const user: UserJwtPayload = res.locals.user;

    // await new Promise((resolve) => setTimeout(resolve, 3500));

    const response = await hiringService.createProcess({
        data: req.body,
        user
    });

    return res.status(response.status).json(response);
}

async function getCompanyHiringProcess(req: Request, res: Response) {

    const { profileId }: UserJwtPayload = res.locals.user;

    // await new Promise((resolve) => setTimeout(resolve, 3600));

    const response = await hiringService.getCompanyHiringProcessList(profileId);

    return res.status(response.status).json(response);
};

async function getCompanyHiringProcessById(req: Request, res: Response) {

    const { profileId }: UserJwtPayload = res.locals.user;

    const { processId } = req.params;

    const response = await hiringService.getCompanyHiringProcessById(profileId, processId);

    return res.status(response.status).json(response);
}

async function updateHiringProcessStepList(req: Request, res: Response) {

    const { email: recruiterEmail }: UserJwtPayload = res.locals.user;

    const { processId, candidatesLists } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await hiringService.updateCandidateList({ recruiterEmail, processId, candidatesLists });

    return res.status(response.status).json(response);
};

async function createNewCandidateList(req: Request, res: Response) {

    const response = await hiringService.createNewStepCandidateList(req.body);

    return res.status(response.status).json(response);
}

const companyHiringController = {

    startHiringProcess,
    createNewCandidateList,
    getCompanyHiringProcess,
    changeHiringProcessStep,
    getCompanyHiringProcessById,
    updateHiringProcessStepList,
}

export default companyHiringController;