import { Account } from '../models/account.js';
import profileRepository from '../repositories/profile.js';

async function getAccountProfile(account: Account) {

	if (account.accountType === 'CANDIDATE') {
		return await profileRepository.getCandidateProfile(account.profileId);

	} else if (account.accountType === 'COMPANY') {
		return await profileRepository.getCandidateProfile(account.profileId);
	}
}
const profileService = {
	getAccountProfile
};

export default profileService;