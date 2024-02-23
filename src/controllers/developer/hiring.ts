import { Request, Response } from 'express';

import { UserJwtPayload } from '../../models/user.js';
import hiringService from '../../services/hiring/hiring.js';

async function applyToProcess(req: Request, res: Response) {

    const { userId }: UserJwtPayload = res.locals.user;

    const { candidate, processId } = req.body;

    const response = await hiringService.applyToProcess({
        processId,
        candidate: { ...candidate, userId }
    });

    return res.status(response.status).json(response);
};

const developerHiringController = {

    applyToProcess
}

export default developerHiringController;