import { Account, AccountType } from '../models/account.js';
import { ApiResponse } from '../models/api.js';

import accountRepository from '../repositories/account.js';
import profileRepository from '../repositories/profile.js';

import { apiErrors, appMessageErros } from '../errors/index.js';
import { AccountProfile } from '../models/profile/profile.js';

import { CreateNewCandidateProfileData } from '../models/profile/candidate.profile.js';
import { CreateNewCompanyProfileData } from '../models/profile/company.profile.js';
import profileService from './profile.js';

interface CreateNewAccountRequestData {
  userId: string;
  type: AccountType;
  data: CreateNewCandidateProfileData | CreateNewCompanyProfileData;
}

async function getAccountUserOrThrow(userId: string) {

	const accountUser = await accountRepository.getAccountUser(userId);

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

// ----------------------------------------------------------------------------------------

async function getUserAccount(userId: string) {

	const accountUser = await getAccountUserOrThrow(userId);

	const account = await getAccountOrThrow(accountUser.accountId);

	const response: ApiResponse<{ account: Account }> = {
		status: 200,
		message: 'Conta encontrada com sucesso',
		data: {
			account,
		},
	};

	return response;
}

async function getAccountProfile(	userId: string): Promise<ApiResponse<{ profile: AccountProfile }>> {

	const accountUser = await getAccountUserOrThrow(userId);

	const account = await getAccountOrThrow(accountUser.accountId);

	const profile = await profileService.getAccountProfile(account);

	const response: ApiResponse<{ profile: AccountProfile }> = {
		status: 200,
		message: 'Perfil encontrado com sucesso',
		data: {
			profile,
		},
	};

	return response;
}

async function createNewAccount({	userId,	type,	data}: CreateNewAccountRequestData): Promise<ApiResponse<{ account: Account }>> {
	
	const accountUser = await accountRepository.getAccountUser(userId);

	if (accountUser) {
		apiErrors.Conflict(appMessageErros.accountUser.alreadyExists);
	}

	let profile: AccountProfile | null = null;

	if (type === 'CANDIDATE') {
		profile = await profileRepository.createNewCandidateProfile(data);
	} else if (type === 'COMPANY') {
		profile = await profileRepository.createNewCompanyProfile(data);
	}

	const account = await accountRepository.createAccount({
		accountType: type,
		profileId: profile.id,
	});

	await accountRepository.createAccountUser({
		accountId: account.id,
		userId,
	});

	const response: ApiResponse<{ account: Account }> = {
		status: 201,
		message: 'Conta criada com sucesso!',
		data: {
			account,
		},
	};

	return response;
}

async function getAccountAndAccountProfile(userId: string) {
	const { accountId } = await getAccountUserOrThrow(userId);

	const account = await getAccountOrThrow(accountId);

	const profile = await profileService.getAccountProfile(account);

	const response: ApiResponse<{ account: Account; profile: AccountProfile }> = {
		status: 200,
		message: 'Dados da conta obtidos com sucesso',
		data: {
			account,
			profile,
		},
	};

	return response;
}

const accountService = {
	getAccountAndAccountProfile,
	getUserAccount,
	getAccountProfile,
	createNewAccount,
};

export default accountService;
