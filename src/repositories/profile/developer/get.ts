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

const getDeveloperProfilePackage = {
    getDeveloperProfile
}

export default getDeveloperProfilePackage