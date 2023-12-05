import db from '../config/db.js';

// import { CompanyProfile, CreateNewCompanyProfileData } from '../models/profile/company.profile.js';

import { CreateNewCandidateProfileData } from '../models/profile/candidate.profile.js';

const now = (): string => new Date().getTime().toString();

async function createNewCandidateProfile(profile: CreateNewCandidateProfileData) {

	return await db.candidateProfile.create({

		data: {

			address: profile.contact.address,
			email: profile.contact.email,
			github: profile.contact.github,
			linkedin: profile.contact.linkedin,
			phone: profile.contact.phone,
			name: profile.about.name,
			occupation: profile.about.occupation,
			resume: profile.about.resume,
			age: profile.about.age,

			CandidateProfileAcademicEducationModel: {
				createMany: {
					data: profile.academic_education,
				},
			},

			CandidateProfileJobExperiencesModel: {
				createMany: {
					data: profile.professional_experiences,
				},
			},

			CandidateProfileCertificatesModel: {
				createMany: {
					data: profile.certificates,
				},
			},

			CandidateProfileLanguagesModel: {
				createMany: {
					data: profile.languages,
				},
			},

			CandidateProfileProjectsModel: {
				createMany: {
					data: profile.projects,
				},
			},

			CandidateProfileStackListModel: {
				createMany: {
					data: profile.stack,
				},
			},

			createdAt: now(),
			updatedAt: now(),
		},

		// include: {
		// 	CandidateProfileAcademicEducationModel: true,
		// 	CandidateProfileJobExperiencesModel: true,
		// 	CandidateProfileCertificatesModel: true,
		// 	CandidateProfileLanguagesModel: true,
		// 	CandidateProfileProjectsModel: true,
		// 	CandidateProfileStackListModel: true,
		// },
	});

}

// async function createNewCompanyProfile(data: CreateNewCompanyProfileData): Promise<CompanyProfile> {

// 	return await db.companyProfile.create({
// 		data: {
// 			...data,
// 			createdAt: now(),
// 			updatedAt: now()
// 		}
// 	});
// }

async function getCompanyProfile(profileId: string) {

	return await db.companyProfile.findUnique({
		where: {
			id: profileId
		},
	});
}

async function getCandidateProfile(profileId: string) {

	const profile = await db.candidateProfile.findUnique({

		where: {
			id: profileId
		},

		include: {
			CandidateProfileAcademicEducationModel: true,
			CandidateProfileJobExperiencesModel: true,
			CandidateProfileCertificatesModel: true,
			CandidateProfileLanguagesModel: true,
			CandidateProfileProjectsModel: true,
			CandidateProfileStackListModel: true,
		},
	});

	return {

		about: {
			age: profile.age,
			name: profile.name,
			occupation: profile.occupation,
			resume: profile.resume
		},
		contact: {
			address: profile.address,
			email: profile.email,
			github: profile.github,
			linkedin: profile.linkedin,
			phone: profile.phone
		},

		id: profile.id,
		createdAt: profile.createdAt,
		updatedAt: profile.updatedAt,
		stack: profile.CandidateProfileStackListModel,
		projects: profile.CandidateProfileProjectsModel,
		languages: profile.CandidateProfileLanguagesModel,
		certificates: profile.CandidateProfileCertificatesModel,
		academic_education: profile.CandidateProfileAcademicEducationModel,
		professional_experiences: profile.CandidateProfileJobExperiencesModel,
	}

}

const profileRepository = {
	createNewCandidateProfile,
	// createNewCompanyProfile,
	getCandidateProfile,
	getCompanyProfile,
};

export default profileRepository;