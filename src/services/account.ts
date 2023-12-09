import bcrypt from 'bcrypt';

import { Account } from '../models/account.js';
import { ApiResponse } from '../models/api.js';

import accountRepository from '../repositories/account.js';
import profileRepository from '../repositories/profile.js';

import { apiErrors, appMessageErros } from '../errors/index.js';
import { AccountProfile } from '../models/profile/profile.js';

import profileService from './profile.js';
import userRepository from '../repositories/user.js';

import { CreateCompanyAccountRequest, NewCompanyProfile } from '../models/profile/company.profile.js';
import { CreateDeveloperAccountRequest } from '../models/profile/candidate.profile.js';

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

async function checkEmailAvailability(email: string) {

	const user = await userRepository.findUserByEmail(email);

	if (user) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const response: ApiResponse<{}> = {
		status: 200,
		message: 'Email disponível',
	};

	return response;
}

// ----------------------------------------------------------------------------------------

async function createCompanyAccount(profile: CreateCompanyAccountRequest) {

	const findUser = await userRepository.findUserByEmail(profile.account.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const password = await bcrypt.hash(profile.account.password, 10);

	const { id: userId } = await userRepository.createNewUser({
		email: profile.account.email, password
	});

	const newProfile: NewCompanyProfile = {
		...profile, 
		userId
	}

	const { id: profileId } = await profileRepository.createNewCompanyProfile(newProfile);

	const { id: accountId } = await accountRepository.createAccount({
		accountType: 'COMPANY', profileId
	});

	await accountRepository.createAccountUser({ accountId, userId });

	const response: ApiResponse<{}> = {
		status: 201, message: 'Conta criada com sucesso!',
	};

	return response;
}

async function createDevAccount(profile: CreateDeveloperAccountRequest) {

	const findUser = await userRepository.findUserByEmail(profile.contact.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const { id: profileId } = await profileRepository.createNewCandidateProfile(profile);

	const { id: accountId } = await accountRepository.createAccount({
		accountType: 'CANDIDATE', profileId
	});

	const password = await bcrypt.hash(profile.password.password, 10);

	const { id: userId } = await userRepository.createNewUser({
		email: profile.contact.email, password
	});

	await accountRepository.createAccountUser({ accountId, userId });

	const response: ApiResponse<{}> = {
		status: 201, message: 'Conta criada com sucesso!',
	};

	return response;
}

async function getAccountAndAccountProfile(userId: string) {

	const { accountId } = await getAccountUserOrThrow(userId);

	const account = await getAccountOrThrow(accountId);
	const profile = await profileService.getAccountProfile(account);

	const response: ApiResponse<{ account: Account; profile: AccountProfile }> = {
		status: 200, message: 'Dados da conta obtidos com sucesso',
		data: {
			account,
			profile,
		},
	};

	return response;
}

const accountService = {
	createDevAccount,
	createCompanyAccount,

	checkEmailAvailability,
	getAccountAndAccountProfile,
};

export default accountService;
