import db from '../config/db.js';

import { CompanyProfile, CreateCompanyAccountRequest, NewCompanyProfile } from '../models/profile/company.profile.js';
import { DeveloperProfile, CreateDeveloperAccountRequest } from '../models/profile/candidate.profile.js';

const now = (): string => new Date().getTime().toString();

const createdAtAndUpdatedAtNow = () => {
	return {
		createdAt: now(),
		updatedAt: now(),
	}
}

async function createCandidateProfile(profile: CreateDeveloperAccountRequest) {

	const createdAtAndUpdatedAt = createdAtAndUpdatedAtNow();

	return await db.candidateProfile.create({

		data: {

			...createdAtAndUpdatedAt,

			CandidateProfileAboutModel: {
				create: {
					...profile.about,
					...createdAtAndUpdatedAt,
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

async function getCandidateProfile(profileId: string): Promise<DeveloperProfile> {

	const profile = await db.candidateProfile.findUnique({

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
	});

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
}



async function createCompanyProfile(profile: NewCompanyProfile) {

	const createdAtAndUpdatedAt = createdAtAndUpdatedAtNow();

	return await db.companyProfile.create({

		data: {

			...createdAtAndUpdatedAt,

			CompanyProfileAddressModel: {
				create: {
					...profile.address,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileDetailsModel: {
				create: {
					...profile.details,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileOwnerInfoModel: {
				create: {
					userId: profile.userId,
					email: profile.account.email,
					name: profile.account.name,
					phone: profile.account.phone,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileSocialNetworkModel: {
				create: {
					...profile.social,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileSupportInfoModel: {
				create: {
					...profile.suport,
					...createdAtAndUpdatedAt,
				}
			}
		}
	})
}

async function getCompanyProfile(profileId: string): Promise<CompanyProfile> {

	const profile = await db.companyProfile.findUnique({

		where: {
			id: profileId
		},

		include: {
			CompanyProfileAddressModel: true,
			CompanyProfileDetailsModel: true,
			CompanyProfileOwnerInfoModel: true,
			CompanyProfileSocialNetworkModel: true,
			CompanyProfileSupportInfoModel: true
		},
	});

	return {

		id: profile.id,
		createdAt: profile.createdAt,
		updatedAt: profile.updatedAt,
		address: profile.CompanyProfileAddressModel,
		details: profile.CompanyProfileDetailsModel,
		ownerInfo: profile.CompanyProfileOwnerInfoModel,
		socialNetwork: profile.CompanyProfileSocialNetworkModel,
		suportInfo: profile.CompanyProfileSupportInfoModel
	}

}

const profileRepository = {

	createNewCompanyProfile: createCompanyProfile,
	getCompanyProfile,

	createNewCandidateProfile: createCandidateProfile,
	getCandidateProfile,
};

export default profileRepository;