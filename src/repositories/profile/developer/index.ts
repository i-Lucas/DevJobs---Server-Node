import getDeveloperProfilePackage from "./get.js";
import createDeveloperProfilePackage from "./create.js";
import deleteDeveloperProfilePackage from "./delete.js";
import updateDeveloperProfilePackage from "./update.js";

const developerProfileRepository = {

    create: {

        stack: createDeveloperProfilePackage.createNewStack,
        project: createDeveloperProfilePackage.createNewProject,
        language: createDeveloperProfilePackage.createNewLanguage,
        certificate: createDeveloperProfilePackage.createNewCertificate,
        job_experience: createDeveloperProfilePackage.createNewJobExperience,
        academic_education: createDeveloperProfilePackage.createNewAcademicEducation,

        profile: createDeveloperProfilePackage.createDeveloperProfile,
    },

    delete: {

        stack: deleteDeveloperProfilePackage.deleteStack,
        project: deleteDeveloperProfilePackage.deleteProject,
        language: deleteDeveloperProfilePackage.deleteLanguage,
        certificate: deleteDeveloperProfilePackage.deleteCertificate,
        job_experience: deleteDeveloperProfilePackage.deleteJobExperience,
        academic_education: deleteDeveloperProfilePackage.deleteAcademicEducation,
    },

    get: {

        profile: getDeveloperProfilePackage.getDeveloperProfile,
        talents: getDeveloperProfilePackage.getCandidatesListAsTalent,
        talentsByPagination: getDeveloperProfilePackage.getCandidatesListAsTalentByPagination
    },

    update: {

        about: updateDeveloperProfilePackage.updateAbout,
        stack: updateDeveloperProfilePackage.updateStack,
        contact: updateDeveloperProfilePackage.updateContact,
        project: updateDeveloperProfilePackage.updateProject,
        address: updateDeveloperProfilePackage.updateAddress,
        language: updateDeveloperProfilePackage.updateLanguage,
        certificate: updateDeveloperProfilePackage.updateCertificate,
        job_experience: updateDeveloperProfilePackage.updateJobExperience,
        academic_education: updateDeveloperProfilePackage.updateAcademicEducation,
    }
}

export default developerProfileRepository