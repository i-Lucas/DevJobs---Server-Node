import { Request, Response } from 'express';

import { ApiResponse } from '../../models/api.js';
import developerProfileService from '../../services/developer/profile.js';
import { DeveloperProfile } from '../../models/profile/candidate.profile.js';

async function getDeveloperProfile(req: Request, res: Response) {

    const { profileId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const profile = await developerProfileService.getDeveloperProfile(profileId);

    const response: ApiResponse<DeveloperProfile> = {
        status: 200,
        message: 'Perfil encontrado com sucesso',
        data: profile
    }

    return res.status(response.status).json(response);
}

async function addNewDataFieldInDeveloperProfile(req: Request, res: Response) {

    const { field, data, profileId } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const id = await developerProfileService.addNewDeveloperProfileField({ data, field, profileId });

    const response: ApiResponse<{ id: string }> = {
        status: 200,
        message: 'Perfil atualizado com sucesso',
        data: {
            id
        }
    }

    return res.status(response.status).json(response);
};

const developerProfileController = {
    getDeveloperProfile,
    addNewDataFieldInDeveloperProfile
};

export default developerProfileController;