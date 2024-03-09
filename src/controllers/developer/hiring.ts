import { Request, Response } from 'express';

import { UserJwtPayload } from '../../models/user.js';
import hiringService from '../../services/hiring/hiring.js';
import applicationsRepository from '../../repositories/applications/applications.js';

async function applyToProcess(req: Request, res: Response) {

    const { userId }: UserJwtPayload = res.locals.user;

    const { candidate, processId } = req.body;

    const response = await hiringService.applyToProcess({
        processId,
        candidate: { ...candidate, userId }
    });

    return res.status(response.status).json(response);
};

async function getAllUserApplications(req: Request, res: Response) {

    const { accountId }: UserJwtPayload = res.locals.user;

    const response = await applicationsRepository.getAllUserApplications(accountId);

    return res.status(200).json(response);
}

const developerHiringController = {
    applyToProcess,
    getAllUserApplications,
}

export default developerHiringController;