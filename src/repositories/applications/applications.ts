import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import {

    CandidateStatus,
    HiringProcessSteps,
    ApplyNewCandidate

} from '../../models/hiring.js'

import {
    GetUserApplicationsResponse
} from '../../models/applications.js';

interface UpdateCandidateStatus {

    processId: string
    accountId: string

    status: CandidateStatus
    currentStep: HiringProcessSteps
}

async function getApplicationById(accountId: string, processId: string): Promise<GetUserApplicationsResponse[]> {

    const history = await db.developerApplicationStatus.findMany({

        where: {
            accountId,
            processId
        },
        include: {
            hiringProcess: {
                select: {
                    id: true,
                    title: true,
                    category: true,
                    seniority: true,
                    company: {
                        select: {
                            CompanyProfileDetailsModel: {
                                select: {
                                    fantasy_name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const result: GetUserApplicationsResponse[] = [];

    history.forEach(application => {

        const applicationHistory: GetUserApplicationsResponse = {
            status: application.status,
            processId: application.processId,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            currentStep: application.currentStep,
            title: application.hiringProcess.title,
            category: application.hiringProcess.category,
            seniority: application.hiringProcess.seniority,
            company: application.hiringProcess.company.CompanyProfileDetailsModel.fantasy_name,
        }

        result.push(applicationHistory);
    })

    return result;
}

async function getAllUserApplications(accountId: string) {

    const applications = await db.developerApplicationStatus.findMany({

        where: {
            accountId
        },
        include: {
            hiringProcess: {
                select: {
                    id: true,
                    title: true,
                    category: true,
                    seniority: true,
                    company: {
                        select: {
                            CompanyProfileDetailsModel: {
                                select: {
                                    fantasy_name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const userApplications: GetUserApplicationsResponse[] = [];
    const processedIds = new Set<string>();

    applications.forEach(application => {

        if (processedIds.has(application.processId)) return

        const userApplication: GetUserApplicationsResponse = {
            status: application.status,
            processId: application.processId,
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
            currentStep: application.currentStep,
            title: application.hiringProcess.title,
            category: application.hiringProcess.category,
            seniority: application.hiringProcess.seniority,
            company: application.hiringProcess.company.CompanyProfileDetailsModel.fantasy_name,
        };

        userApplications.push(userApplication);
        processedIds.add(application.processId);
    });

    return userApplications;
}

async function applyInProcess({ processStepListId, candidate }: ApplyNewCandidate) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    await db.hiringDeveloperSubscriber.create({

        data: {

            ...candidate,
            processStepListId,
            ...createdAtAndUpdatedAt,
        }
    });
};

async function updateCandidateStauts(data: UpdateCandidateStatus) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    await db.developerApplicationStatus.create({

        data: {

            status: data.status,
            processId: data.processId,
            accountId: data.accountId,
            currentStep: data.currentStep,
            ...createdAtAndUpdatedAt,
        }
    })
}

const applicationsRepository = {
    applyInProcess,
    getApplicationById,
    getAllUserApplications,
    updateCandidateStauts,
};

export default applicationsRepository;