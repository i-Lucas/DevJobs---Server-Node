import { Request, Response } from 'express';

import { UserJwtPayload } from '../../models/user.js';
import hiringService from '../../services/hiring/hiring.js';
import applicationsService from '../../services/applications.js';

async function applyToProcess(req: Request, res: Response) {

    const { userId }: UserJwtPayload = res.locals.user;

    const { candidate, processId } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await hiringService.applyToProcess({
        processId,
        candidate: { ...candidate, userId }
    });

    return res.status(response.status).json(response);
};

async function getAllUserApplications(req: Request, res: Response) {

    const { accountId }: UserJwtPayload = res.locals.user;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await applicationsService.getAllUserApplications(accountId);

    return res.status(200).json(response);
}

async function getApplicationById(req: Request, res: Response) {
    
    const { accountId }: UserJwtPayload = res.locals.user;

    const { processId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await applicationsService.getApplicationHistory(accountId, processId);

    return res.status(200).json(response);
}

const developerHiringController = {
    applyToProcess,
    getApplicationById,
    getAllUserApplications,
}

export default developerHiringController;