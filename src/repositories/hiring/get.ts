import db from '../../config/db.js';
import { HiringProcess } from '../../models/hiring.js';

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
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
}

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

        // include: {
        //     steps: {
        //         where: {
        //             identifier: 'OPEN_FOR_APPLICATIONS'
        //         }
        //     },
        // },
    });
}

const getHiringProcessPackage = {
    getAllAppJobOffers,
    getCompanyOfferById,
    getHiringProcessById,
    getCompanyHiringProcessList,
    getCompanyOffersWithoutSteps,
}

export default getHiringProcessPackage;