import { ApiResponse } from '../../models/api.js';
import { UserJwtPayload } from '../../models/user.js';
import { CreateNewProcessData, HiringProcess, NewHiringProcessResponse } from '../../models/hiring.js';

import accountService from '../account.js';
import hiringRepository from '../../repositories/hiring/index.js';

interface CreateNewProcess {
    user: UserJwtPayload;
    data: Omit<CreateNewProcessData, 'recruiter'>;
};

async function createProcess({ data, user }: CreateNewProcess) {

    const { accountId } = await accountService.getAccountUserOrThrow(user.id);

    const newProcessResponse = await hiringRepository.create.process({
        accountId,
        data: {
            ...data,
            recruiter: user.email
        }
    })

    const response: ApiResponse<NewHiringProcessResponse> = {
        status: 200,
        message: 'Processo seletivo iniciado com sucesso!',
        data: newProcessResponse
    };

    return response;
};

async function getCompanyHiringProcessList(userId: string): Promise<ApiResponse<any>> {

    const { accountId } = await accountService.getAccountUserOrThrow(userId);
    const processList = await hiringRepository.get.allCompanyProcess(accountId);

    if (processList.length === 0) {

        const response: ApiResponse<null> = {
            status: 200,
            message: 'Nenhum processo seletivo foi encontrado.',
        }

        return response;
    }

    const response: ApiResponse<{ processList: HiringProcess[] }> = {

        status: 200,
        message: 'Processos seletivos encontrados com sucesso!',
        data: {
            processList
        }
    }

    return response
}

const hiringService = {
    createProcess,
    getCompanyHiringProcessList
};

export default hiringService;