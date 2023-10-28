import db from '../config/db.js';

import { CompanyProfile, CreateNewCompanyProfileData } from '../models/profile/company.profile.js';

import { CandidateProfile, CreateNewCandidateProfileData } from '../models/profile/candidate.profile.js';

const now = (): string => new Date().getTime().toString();

async function createNewCandidateProfile(data: CreateNewCandidateProfileData): Promise<CandidateProfile> {

	return await db.candidateProfile.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now()
		}
	});
}

async function createNewCompanyProfile(data: CreateNewCompanyProfileData): Promise<CompanyProfile> {

	return await db.companyProfile.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now()
		}
	});
}

async function getCompanyProfile(profileId: string): Promise<CompanyProfile> {

	return await db.companyProfile.findUnique({
		where: {
			id: profileId
		}
	});
}

async function getCandidateProfile(profileId: string): Promise<CandidateProfile> {

	return await db.candidateProfile.findUnique({
		where: {
			id: profileId
		}
	});
}

const profileRepository = {
	createNewCandidateProfile,
	createNewCompanyProfile,
	getCandidateProfile,
	getCompanyProfile,
};

export default profileRepository;