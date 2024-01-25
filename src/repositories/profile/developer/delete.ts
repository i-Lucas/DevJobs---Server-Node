import db from '../../../config/db.js'

async function deleteAcademicEducation(id: string) {

    await db.candidateProfileAcademicEducationModel.delete({
        where: {
            id
        }
    })
}

async function deleteJobExperience(id: string) {

    await db.candidateProfileJobExperiencesModel.delete({
        where: {
            id
        }
    })
}

async function deleteCertificate(id: string) {

    await db.candidateProfileCertificatesModel.delete({
        where: {
            id
        }
    })
}

async function deleteLanguage(id: string) {

    await db.candidateProfileLanguagesModel.delete({
        where: {
            id
        }
    })
}

async function deleteStack(id: string) {

    await db.candidateProfileStackListModel.delete({
        where: {
            id
        }
    })
}

async function deleteProject(id: string) {

    await db.candidateProfileProjectsModel.delete({
        where: {
            id
        }
    })
}

const deleteDeveloperProfilePackage = {

    deleteStack,
    deleteProject,
    deleteLanguage,
    deleteCertificate,
    deleteJobExperience,
    deleteAcademicEducation,
}

export default deleteDeveloperProfilePackage;