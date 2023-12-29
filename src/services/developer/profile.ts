import { apiErrors, appMessageErros } from '../../errors/index.js';
import { DeveloperProfile, DeveloperProfileAcademicEducation } from "../../models/profile/candidate.profile.js";
import developerProfileRepository from '../../repositories/profile/developer.js';

async function getDeveloperProfile(profileId: string): Promise<DeveloperProfile> {

	const profile = await developerProfileRepository.getDeveloperProfile(profileId);

	if (!profile) {
		apiErrors.NotFound(appMessageErros.profile.notFound)
	};

	return {

		id: profile.id,
		createdAt: profile.createdAt,
		updatedAt: profile.updatedAt,
		about: profile.CandidateProfileAboutModel,
		address: profile.CandidateProfileAddressModel,
		contact: profile.CandidateProfileContactModel,
		stack: profile.CandidateProfileStackListModel,
		projects: profile.CandidateProfileProjectsModel,
		languages: profile.CandidateProfileLanguagesModel,
		certificates: profile.CandidateProfileCertificatesModel,
		academic_education: profile.CandidateProfileAcademicEducationModel,
		professional_experiences: profile.CandidateProfileJobExperiencesModel,
	}
};

interface UpdateDeveloperProfileField {
	data: any
	field: keyof DeveloperProfile,
	profileId: string,
}

async function addNewDeveloperProfileField({ data, field, profileId }: UpdateDeveloperProfileField) {

	if (field === 'academic_education') {

		const academicEducation = data as DeveloperProfileAcademicEducation
		const newField = await developerProfileRepository.addNewAcademicEducation({ profileId, data: academicEducation });
		return newField.id;
	}
};

const developerProfileService = {
	getDeveloperProfile,
	addNewDeveloperProfileField
}

export default developerProfileService;