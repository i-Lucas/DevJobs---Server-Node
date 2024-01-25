import db from '../../../config/db.js'
import utils from '../../../utils/appUtils.js';

import {

    DeveloperProfileAbout,
    DeveloperProfileAddress,
    DeveloperProfileContact,
    DeveloperProfileProjects,
    DeveloperProfileLanguages,
    DeveloperProfileStackList,
    DeveloperProfileCertificates,
    DeveloperProfileJobExperiences,
    DeveloperProfileAcademicEducation,

} from '../../../models/profile/candidate.profile.js';

async function updateAddress(data: DeveloperProfileAddress) {

    const now = utils.now();

    return await db.candidateProfileAddressModel.update({

        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateContact(
    data: Omit<DeveloperProfileContact, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileContact> {

    const now = utils.now();

    return await db.candidateProfileContactModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateAbout(
    data: Omit<DeveloperProfileAbout, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileAbout> {

    const now = utils.now();

    return await db.candidateProfileAboutModel.update({
        where: {
            profileId: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateAcademicEducation(
    data: Omit<DeveloperProfileAcademicEducation, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileAcademicEducation> {

    const now = utils.now();

    return await db.candidateProfileAcademicEducationModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateJobExperience(
    data: Omit<DeveloperProfileJobExperiences, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileJobExperiences> {

    const now = utils.now();

    return await db.candidateProfileJobExperiencesModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateCertificate(
    data: Omit<DeveloperProfileCertificates, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileCertificates> {

    const now = utils.now();

    return await db.candidateProfileCertificatesModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateLanguage(
    data: Omit<DeveloperProfileLanguages, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileLanguages> {

    const now = utils.now();

    return await db.candidateProfileLanguagesModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateProject(
    data: Omit<DeveloperProfileProjects, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileProjects> {

    const now = utils.now();

    return await db.candidateProfileProjectsModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

async function updateStack(
    data: Omit<DeveloperProfileStackList, 'createdAt' | 'updatedAt'>):
    Promise<DeveloperProfileStackList> {

    const now = utils.now();

    return await db.candidateProfileStackListModel.update({
        where: {
            id: data.id
        },
        data: {
            ...data,
            updatedAt: now
        }
    })
}

const updateDeveloperProfilePackage = {

    updateAbout,
    updateStack,
    updateProject,
    updateAddress,
    updateContact,
    updateLanguage,
    updateCertificate,
    updateJobExperience,
    updateAcademicEducation,
}

export default updateDeveloperProfilePackage;