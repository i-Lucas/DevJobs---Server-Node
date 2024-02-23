import { Request, Response } from 'express';

import { ApiResponse } from '../../models/api.js';
import companyProfileService from '../../services/company/profile.js';
import { CompanyProfile } from '../../models/profile/company.profile.js';

async function getCompanyProfile(req: Request, res: Response) {

    const { profileId } = req.params;

    // await new Promise((resolve) => setTimeout(resolve, 2500));

    const profile = await companyProfileService.getCompanyProfile(profileId);

    const response: ApiResponse<CompanyProfile> = {
        status: 200,
        message: 'Perfil encontrado com sucesso',
        data: profile
    }

    return res.status(response.status).json(response);
};

async function updateCompanyProfile(req: Request, res: Response) {

    const { identifier, data, profileId } = req.body;

    // await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await companyProfileService.updateCompanyProfile({ data, identifier, profileId });

    return res.status(response.status).json(response);
};

const companyProfileController = {
    getCompanyProfile,
    updateCompanyProfile
}

export default companyProfileController;