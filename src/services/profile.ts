import { Account } from '../models/account.js';

import profileRepository from '../repositories/profile.js';

import { AccountProfile } from '../models/profile/profile.js';

// async function getAccountProfile(account: Account) {

// 	let profile: AccountProfile | null = null;

// 	if (account.accountType === 'CANDIDATE') {
// 		profile = await profileRepository.getCandidateProfile(account.profileId);

// 	} else if (account.accountType === 'COMPANY') {
// 		profile = await profileRepository.getCompanyProfile(account.profileId);
// 	}

// 	if (!profile) {
// 		throw { status: 404, message: 'Perfil não encontrado' };
// 	}

// 	return profile;
// }

const profileService = {
	// getAccountProfile
};

export default profileService;