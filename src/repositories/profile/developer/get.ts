import db from '../../../config/db.js'

async function getDeveloperProfile(profileId: string) {

    return await db.candidateProfile.findUnique({

        where: {
            id: profileId
        },

        include: {
            CandidateProfileAboutModel: true,
            CandidateProfileContactModel: true,
            CandidateProfileAddressModel: true,
            CandidateProfileProjectsModel: {
                orderBy: {
                    updatedAt: 'desc'
                }
            },
            CandidateProfileStackListModel: {
                orderBy: {
                    updatedAt: 'desc'
                }
            },
            CandidateProfileLanguagesModel: {
                orderBy: {
                    updatedAt: 'desc'
                }
            },
            CandidateProfileCertificatesModel: {
                orderBy: {
                    updatedAt: 'desc'
                }
            },
            CandidateProfileJobExperiencesModel: {
                orderBy: {
                    from: 'desc'
                }
            },
            CandidateProfileAcademicEducationModel: {
                orderBy: {
                    from: 'desc'
                }
            },
        },
    })
};

async function getCandidatesListAsTalentByPagination(startIndex: number, pageSize: number) {

    const count = await db.candidateProfile.count(); 

    const talents =  await db.candidateProfile.findMany({

        skip: startIndex,
        take: pageSize,

        include: {
            CandidateProfileAboutModel: {
                select: {
                    name: true,
                    resume: true,
                    picture: true,
                    occupation: true,
                },
            },
            CandidateProfileAddressModel: {
                select: {
                    city: true,
                    state: true
                }
            },
            CandidateProfileStackListModel: {
                select: {
                    name: true
                }
            },
            CandidateProfileLanguagesModel: {
                select: {
                    language: true
                }
            },
        },
        orderBy: {
            createdAt: 'asc'
        },
    });


    return {
        talents,
        count
    }
}

async function getCandidatesListAsTalent() {

    return await db.candidateProfile.findMany({
        include: {
            CandidateProfileAboutModel: {
                select: {
                    name: true,
                    resume: true,
                    picture: true,
                    occupation: true,
                },
            },
            CandidateProfileAddressModel: {
                select: {
                    city: true,
                    state: true
                }
            },
            CandidateProfileStackListModel: {
                select: {
                    name: true
                }
            },
            CandidateProfileLanguagesModel: {
                select: {
                    language: true
                }
            }
        }
    });
}

const getDeveloperProfilePackage = {
    getDeveloperProfile,
    getCandidatesListAsTalent,
    getCandidatesListAsTalentByPagination
}

export default getDeveloperProfilePackage