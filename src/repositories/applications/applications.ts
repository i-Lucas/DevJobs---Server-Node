import db from '../../config/db.js'

import utils from "../../utils/appUtils.js";

async function getAllUserApplications(accountId: string) {

    const userProcesses = await db.processStepList.findMany({
        where: {
            candidates: {
                some: {
                    accountId
                }
            }
        },
        select: {
            id: true,
            processStep: {
                select: {
                    hiringProcess: {
                        select: {
                            id: true,
                            title: true,                            
                            currentStep: true
                        }
                    },
                    identifier: true,
                    createdAt: true
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // obter apenas o primeiro registro de cada processo ( etapa atual )
    // cada processo pode ter vários registros do mesmo usuário ( um por etapa )
    const uniqueUserProcesses = userProcesses.filter((process, index, self) => {
        const currentIndex = self.findIndex(item => item.processStep.hiringProcess.id === process.processStep.hiringProcess.id);
        return currentIndex === index;
    });

    const userApplications = uniqueUserProcesses.map(process => ({
        processId: process.processStep.hiringProcess.id,
        title: process.processStep.hiringProcess.title,
        currentStep: process.processStep.identifier,
        stepListId: process.id
    }));

    return userApplications;
};

const applicationsRepository = {
    getAllUserApplications
};

export default applicationsRepository;