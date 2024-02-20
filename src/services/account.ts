import { ApiResponse } from '../models/api.js';

import companyProfileService from './company/profile.js';
import userRepository from '../repositories/user/user.js';
import developerProfileService from './developer/profile.js';
import { apiErrors, appMessageErros } from '../errors/index.js';
import accountRepository from '../repositories/account/account.js';
import accountUserRepository from '../repositories/account/user.js';
import { Account, GetAccountDataResponse } from '../models/account.js';

async function getAccountUserOrThrow(userId: string) {

	const accountUser = await accountUserRepository.getAccountUser(userId);

	if (!accountUser) {
		apiErrors.NotFound(appMessageErros.accountUser.notFound);
	}

	return accountUser;
}

async function getAccountOrThrow(accountId: string) {

	const account = await accountRepository.getAccount(accountId);

	if (!account) {
		apiErrors.NotFound(appMessageErros.account.notFound);
	}

	return account;
}

async function getAccountProfileByProfileId(profileId: string) {

	const account = await accountRepository.getAccountByProfileId(profileId);

	if (!account) {
		apiErrors.NotFound(appMessageErros.account.notFound);
	}

	return getAccountProfile(account);
}

async function getAccountProfile(account: Account) {

	if (account.accountType === 'CANDIDATE') {
		return await developerProfileService.getDeveloperProfile(account.profileId);
	}

	else if (account.accountType === 'COMPANY') {
		return await companyProfileService.getCompanyProfile(account.profileId);
	}
};

async function getAccountData(userId: string) {

	const { accountId } = await getAccountUserOrThrow(userId);

	const account = await getAccountOrThrow(accountId);

	const profile = await getAccountProfileByProfileId(account.profileId);
	const user = await userRepository.findUserById(userId);

	delete user.password

	const response: ApiResponse<GetAccountDataResponse> = {
		status: 200, message: 'Dados da conta obtidos com sucesso',
		data: {
			account,
			profile,
			user
		},
	};

	return response;
};

const accountService = {
	getAccountData,
	getAccountUserOrThrow
};

export default accountService;
