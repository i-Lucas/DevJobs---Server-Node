import db from '../../config/db.js';

import { HiringProcess, HiringProcessSteps } from '../../models/hiring.js';

async function getCompanyContactEmailByHiringRecruiterEmail(email: string) {

    return await db.hiringProcess.findFirst({
        where: {
            sponsor: email
        },
        select: {
            company: {
                select: {
                    CompanyProfileSupportInfoModel: {
                        select: {
                            rhEmail: true
                        }
                    }
                }
            }
        },
    })
}

async function getProcessCurrentStep(processId: string) {

    const hiringProcess = await db.hiringProcess.findUnique({
        where: {
            id: processId
        },
        select: {
            currentStep: true,
            steps: true,
        }
    });

    const currentStep = hiringProcess.steps.find(step => step.identifier === hiringProcess.currentStep);
    return currentStep;
}

async function getHiringProcessById(processId: string) {

    return await db.hiringProcess.findUnique({
        where: {
            id: processId
        },
        include: {
            steps: {
                include: {
                    candidatesLists: {
                        include: {
                            candidates: true
                        }
                    }
                }
            }
        }
    })
}

async function getCompanyHiringProcessList(companyProfileId: string): Promise<HiringProcess[]> {

    const hiringProcesses = await db.hiringProcess.findMany({
        where: {
            companyProfileId
        },
        include: {
            steps: {
                include: {
                    candidatesLists: {
                        include: {
                            candidates: true
                        }
                    }
                }
            },
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    if (hiringProcesses.length === 0) return [];

    hiringProcesses.forEach(hiringProcess => {

        if (hiringProcess.steps.length > 0) {

            // ordenar as etapas de forma que a mais atual fique em primeiro lugar
            hiringProcess.steps.sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
            });
        }

    });

    return hiringProcesses;
}

/*
async function getCompanyHiringProcessList(companyProfileId: string): Promise<HiringProcess[]> {

    return await db.hiringProcess.findMany({
        where: {
            companyProfileId
        },
        include: {
            steps: {
                include: {
                    candidatesLists: {
                        include: {
                            candidates: true
                        }
                    }
                }
            },
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
};
*/

async function getCompanyOffersWithoutSteps(companyProfileId: string) {

    return await db.hiringProcess.findMany({
        where: {
            steps: {
                every: {
                    identifier: 'OPEN_FOR_APPLICATIONS'
                }
            },
            companyProfileId,
        },
        include: {
            company: {
                select: {
                    CompanyProfileAddressModel: {
                        select: {
                            city: true,
                            state: true,
                        }
                    },
                    CompanyProfileDetailsModel: {
                        select: {
                            fantasy_name: true
                        }
                    },
                    CompanyProfileSocialNetworkModel: {
                        select: {
                            picture: true
                        }
                    }
                }
            }
        }
    })
};

async function getCompanyOfferById(offerId: string) {

    return await db.hiringProcess.findUnique({
        where: {
            id: offerId
        },
        include: {
            company: {
                select: {
                    CompanyProfileAddressModel: {
                        select: {
                            city: true,
                            state: true,
                        }
                    },
                    CompanyProfileDetailsModel: {
                        select: {
                            fantasy_name: true
                        }
                    },
                    CompanyProfileSocialNetworkModel: {
                        select: {
                            picture: true
                        }
                    }
                }
            }
        }
    })
};

async function getAllAppJobOffers() {

    return await db.hiringProcess.findMany({

        where: {
            steps: {
                every: {
                    identifier: 'OPEN_FOR_APPLICATIONS'
                }
            },
        },
        include: {
            company: {
                select: {
                    CompanyProfileAddressModel: {
                        select: {
                            city: true,
                            state: true,
                        }
                    },
                    CompanyProfileDetailsModel: {
                        select: {
                            fantasy_name: true
                        }
                    },
                    CompanyProfileSocialNetworkModel: {
                        select: {
                            picture: true
                        }
                    }
                }
            }
        }
    });
}

async function getAllAppJobOffersByPagination(startIndex: number, pageSize: number) {

    const count = await db.hiringProcess.count();

    const offers = await db.hiringProcess.findMany({

        skip: startIndex,
        take: pageSize,

        where: {
            steps: {
                every: {
                    identifier: 'OPEN_FOR_APPLICATIONS'
                }
            },
        },
        include: {
            company: {
                select: {
                    CompanyProfileAddressModel: {
                        select: {
                            city: true,
                            state: true,
                        }
                    },
                    CompanyProfileDetailsModel: {
                        select: {
                            fantasy_name: true
                        }
                    },
                    CompanyProfileSocialNetworkModel: {
                        select: {
                            picture: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return {
        offers,
        count
    }
}

async function getStepCandidatesLists(hiringProcessId: string, stepId: HiringProcessSteps) {

    return await db.processStep.findFirst({
        where: {
            hiringProcessId,
            identifier: stepId
        },
        select: {
            id: true,
            identifier: true,
            hiringProcessId: true,
            candidatesLists: {
                include: {
                    candidates: true,
                },

            }
        }
    })
}

const getHiringProcessPackage = {
    getAllAppJobOffers,
    getCompanyOfferById,
    getHiringProcessById,
    getProcessCurrentStep,
    getStepCandidatesLists,
    getCompanyHiringProcessList,
    getCompanyOffersWithoutSteps,
    getAllAppJobOffersByPagination,
    getCompanyContactEmailByHiringRecruiterEmail
}

export default getHiringProcessPackage;