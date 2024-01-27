import { Request, Response } from 'express';

import { ApiResponse } from '../../models/api.js';
import developerProfileService from '../../services/developer/profile.js';
import { DeveloperProfile } from '../../models/profile/candidate.profile.js';

async function getDeveloperProfile(req: Request, res: Response) {

    const { profileId } = req.params;

    // await new Promise((resolve) => setTimeout(resolve, 1500));

    const profile = await developerProfileService.getDeveloperProfile(profileId);

    const response: ApiResponse<DeveloperProfile> = {
        status: 200,
        data: profile,
        message: 'Perfil encontrado com sucesso',
    }

    return res.status(response.status).json(response);
}

async function updateDeveloperProfile(req: Request, res: Response) {

    const { identifier, data, profileId } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await developerProfileService.updateDeveloperProfile({ data, identifier, profileId });

    return res.status(response.status).json(response);
};

async function deleteDeveloperProfileField(req: Request, res: Response) {

    const { id, identifier } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await developerProfileService.deleteDeveloperProfileField({ id, identifier });

    return res.status(response.status).json(response);
}

async function addDeveloperProfileField(req: Request, res: Response) {

    const { identifier, data, profileId } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await developerProfileService.addDeveloperProfileField({ data, identifier, profileId });

    return res.status(response.status).json(response);
}

const developerProfileController = {
    getDeveloperProfile,
    updateDeveloperProfile,
    addDeveloperProfileField,
    deleteDeveloperProfileField,
};

export default developerProfileController;