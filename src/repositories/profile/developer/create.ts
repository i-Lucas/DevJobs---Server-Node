import db from '../../../config/db.js'
import appConfig from '../../../config/app.js';
import utils from '../../../utils/appUtils.js';

import {

    CreateNewStack,
    CreateNewProject,
    CreateNewLanguage,
    CreateNewCertificate,
    CreateNewJobExperience,
    DeveloperProfileProjects,
    DeveloperProfileLanguages,
    DeveloperProfileStackList,
    CreateNewAcademicEducation,
    DeveloperProfileCertificates,
    CreateDeveloperAccountRequest,
    DeveloperProfileJobExperiences,
    DeveloperProfileAcademicEducation,

} from '../../../models/profile/candidate.profile.js';

async function createNewProject({ data }: CreateNewProject): Promise<DeveloperProfileProjects> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileProjectsModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createNewStack({ data }: CreateNewStack): Promise<DeveloperProfileStackList> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileStackListModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createNewLanguage({ data }: CreateNewLanguage): Promise<DeveloperProfileLanguages> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileLanguagesModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createNewCertificate({ data }: CreateNewCertificate): Promise<DeveloperProfileCertificates> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileCertificatesModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createNewJobExperience({ data }: CreateNewJobExperience): Promise<DeveloperProfileJobExperiences> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileJobExperiencesModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createNewAcademicEducation({ data }: CreateNewAcademicEducation): Promise<DeveloperProfileAcademicEducation> {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfileAcademicEducationModel.create({

        data: {
            ...data,
            ...createdAtAndUpdatedAt
        },
    })
}

async function createDeveloperProfile(profile: CreateDeveloperAccountRequest) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.candidateProfile.create({

        data: {

            ...createdAtAndUpdatedAt,

            CandidateProfileAboutModel: {
                create: {
                    ...profile.about,
                    ...createdAtAndUpdatedAt,
                    picture: appConfig.client.candidate.default_picture
                },
            },

            CandidateProfileAddressModel: {
                create: {
                    ...profile.address,
                    ...createdAtAndUpdatedAt,
                }
            },

            CandidateProfileContactModel: {
                create: {
                    ...profile.contact,
                    ...createdAtAndUpdatedAt,
                }
            },

            CandidateProfileAcademicEducationModel: {
                createMany: {
                    data: profile.academic_education
                }
            },

            CandidateProfileCertificatesModel: {
                createMany: {
                    data: profile.certificates
                }
            },

            CandidateProfileJobExperiencesModel: {
                createMany: {
                    data: profile.professional_experiences,
                }
            },

            CandidateProfileLanguagesModel: {
                createMany: {
                    data: profile.languages
                }
            },

            CandidateProfileProjectsModel: {
                createMany: {
                    data: profile.projects,
                }
            },

            CandidateProfileStackListModel: {
                createMany: {
                    data: profile.stack,
                }
            },
        }
    });
}

const createDeveloperProfilePackage = {

    createNewStack,
    createNewProject,
    createNewLanguage,
    createNewCertificate,
    createNewJobExperience,
    createDeveloperProfile,
    createNewAcademicEducation,
}

export default createDeveloperProfilePackage;