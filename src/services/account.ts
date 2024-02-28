import { ApiResponse } from '../models/api.js';

import companyProfileService from './company/profile.js';
import userRepository from '../repositories/user/user.js';
import developerProfileService from './developer/profile.js';
import { apiErrors, appMessageErros } from '../errors/index.js';
import accountRepository from '../repositories/account/account.js';
// import accountUserRepository from '../repositories/account/user.js';
import { Account, GetAccountDataResponse } from '../models/account.js';
import { UserJwtPayload } from '../models/user.js';
import messageService from './messages.js';

/*
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
}*/

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

async function getAccountData({ accountId, profileId, userId }: Omit<UserJwtPayload, 'email'>) {

	const user = await userRepository.findUserById(userId);

	if (!user) {
		apiErrors.NotFound(appMessageErros.auth.user.notFound);
	}

	const account = await accountRepository.getAccount(accountId);

	if (!account) {
		apiErrors.NotFound(appMessageErros.account.notFound);
	}

	const profile = await getAccountProfileByProfileId(profileId);

	if (!profile) {
		apiErrors.NotFound(appMessageErros.profile.notFound);
	}

	delete user.password;

	const { data: notifications } = await messageService.getAllUserMessages(accountId);

	const response: ApiResponse<GetAccountDataResponse> = {
		status: 200, message: 'Dados da conta obtidos com sucesso!',
		data: {
			notifications,
			account,
			profile,
			user
		},
	};

	return response;
};

const accountService = {
	getAccountData
};

export default accountService;
