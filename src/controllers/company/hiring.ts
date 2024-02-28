import { Request, Response } from 'express';

import { UserJwtPayload } from '../../models/user.js';

import hiringService from '../../services/hiring/hiring.js';

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
}

const companyHiringController = {

    startHiringProcess,
    getCompanyHiringProcess
}

export default companyHiringController;