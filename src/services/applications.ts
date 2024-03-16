import { ApiResponse } from '../models/api.js';

import hiringRepository from '../repositories/hiring/index.js';
import applicationsRepository from '../repositories/applications/applications.js';

import { apiErrors, appMessageErros } from '../errors/index.js';
import { GetUserApplicationsResponse } from '../models/applications.js';

async function getAllUserApplications(accountId: string): Promise<ApiResponse<GetUserApplicationsResponse[]>> {

    const applications = await applicationsRepository.getAllUserApplications(accountId);

    const response: ApiResponse<GetUserApplicationsResponse[]> = {
        status: 200,
        data: applications,
        message: 'Aplicações do usuário obtidas com sucesso!',
    };

    return response
}

async function getApplicationHistory(accountId: string, processId: string): Promise<ApiResponse<GetUserApplicationsResponse[]>> {

    const process = await hiringRepository.get.byId(processId);

    if (!process) {
        apiErrors.NotFound(appMessageErros.hiring.notFound);
    };

    const applicationHistory = await applicationsRepository.getApplicationById(accountId, processId);

    const response: ApiResponse<GetUserApplicationsResponse[]> = {
        status: 200,
        data: applicationHistory,
        message: 'Candidatura encontrada com sucesso!',
    };

    return response
}

const applicationsService = {
    getApplicationHistory,
    getAllUserApplications,
}

export default applicationsService;