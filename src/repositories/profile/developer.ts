import db from '../../config/db.js'
import utils from "../../utils/appUtils.js";
import appConfig from '../../config/app.js';

import {

	CreateDeveloperAccountRequest,
	CreateNewAcademicEducation,
	DeveloperProfileAcademicEducation

} from '../../models/profile/candidate.profile.js';

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

async function getDeveloperProfile(profileId: string) {

	return await db.candidateProfile.findUnique({

		where: {
			id: profileId
		},

		include: {
			CandidateProfileAboutModel: true,
			CandidateProfileContactModel: true,
			CandidateProfileAddressModel: true,
			CandidateProfileProjectsModel: true,
			CandidateProfileStackListModel: true,
			CandidateProfileLanguagesModel: true,
			CandidateProfileCertificatesModel: true,
			CandidateProfileJobExperiencesModel: true,
			CandidateProfileAcademicEducationModel: true,
		},
	})
}

async function addNewAcademicEducation({ profileId, data }: CreateNewAcademicEducation): Promise<DeveloperProfileAcademicEducation> {

	const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

	return await db.candidateProfileAcademicEducationModel.create({

		data: {
			profileId,
			...data,
			...createdAtAndUpdatedAt
		},
	})
}

const developerProfileRepository = {
	createDeveloperProfile,
	getDeveloperProfile,
	addNewAcademicEducation
}

export default developerProfileRepository;