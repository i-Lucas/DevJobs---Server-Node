import { Account, AccountType } from '../models/account.js';
import { ApiResponse } from '../models/api.js';

import accountRepository from '../repositories/account.js';
import profileRepository from '../repositories/profile.js';

import { apiErrors, appMessageErros } from '../errors/index.js';
import { AccountProfile } from '../models/profile/profile.js';

import { CandidateProfile, CreateNewCandidateProfileData } from '../models/profile/candidate.profile.js';

import profileService from './profile.js';
import userRepository from '../repositories/user.js';

import bcrypt from 'bcrypt';

interface CreateNewAccountRequestData {
	profile: CreateNewCandidateProfileData
	account: { email: string, password: string }
}

// async function getAccountUserOrThrow(userId: string) {

// 	const accountUser = await accountRepository.getAccountUser(userId);

// 	if (!accountUser) {
// 		apiErrors.NotFound(appMessageErros.accountUser.notFound);
// 	}

// 	return accountUser;
// }

// async function getAccountOrThrow(accountId: string) {

// 	const account = await accountRepository.getAccount(accountId);

// 	if (!account) {
// 		apiErrors.NotFound(appMessageErros.account.notFound);
// 	}

// 	return account;
// }

// ----------------------------------------------------------------------------------------

// async function getUserAccount(userId: string) {

// 	const accountUser = await getAccountUserOrThrow(userId);

// 	const account = await getAccountOrThrow(accountUser.accountId);

// 	const response: ApiResponse<{ account: Account }> = {
// 		status: 200,
// 		message: 'Conta encontrada com sucesso',
// 		data: {
// 			account,
// 		},
// 	};

// 	return response;
// }

// async function getAccountProfile(userId: string): Promise<ApiResponse<{ profile: AccountProfile }>> {

// 	const accountUser = await getAccountUserOrThrow(userId);

// 	const account = await getAccountOrThrow(accountUser.accountId);

// 	const profile = await profileService.getAccountProfile(account);

// 	const response: ApiResponse<{ profile: AccountProfile }> = {
// 		status: 200,
// 		message: 'Perfil encontrado com sucesso',
// 		data: {
// 			profile,
// 		},
// 	};

// 	return response;
// }

// async function checkEmailAvailability(email: string) {

// 	const user = await userRepository.findUserByEmail(email);

// 	if (user) {
// 		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
// 	}

// 	const response: ApiResponse<{}> = {
// 		status: 200,
// 		message: 'Email disponível',
// 	};

// 	return response;
// }

async function checkEmailAvailability(email: string) {
	// Simula um atraso de 5 segundos (5000 milissegundos)
	await new Promise((resolve) => setTimeout(resolve, 5000));

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


async function createDevAccount({ profile, account }: CreateNewAccountRequestData) {

	const findUser = await userRepository.findUserByEmail(account.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const newProfile = await profileRepository.createNewCandidateProfile(profile);

	const newAccount = await accountRepository.createAccount({
		accountType: 'CANDIDATE',
		profileId: newProfile.id,
	});

	const password = await bcrypt.hash(account.password, 10);
	const newUser = await userRepository.createNewUser({ email: account.email, password });

	await accountRepository.createAccountUser({
		accountId: newAccount.id,
		userId: newUser.id,
	});

	const sendProfile = {

		id: newProfile.id,
		about: {
			age: newProfile.age,
			name: newProfile.name,
			occupation: newProfile.occupation,
			resume: newProfile.resume
		},
		contact: {
			address: newProfile.address,
			email: newProfile.email,
			github: newProfile.github,
			linkedin: newProfile.linkedin,
			phone: newProfile.phone
		},
		academic_education: newProfile.CandidateProfileAcademicEducationModel,
		certificates: newProfile.CandidateProfileCertificatesModel,
		professional_experiences: newProfile.CandidateProfileJobExperiencesModel,
		languages: newProfile.CandidateProfileLanguagesModel,
		projects: newProfile.CandidateProfileProjectsModel,
		stack: newProfile.CandidateProfileStackListModel,
		createdAt: newProfile.createdAt,
		updatedAt: newProfile.updatedAt
	}

	const response: ApiResponse<{ account: Account, profile: CandidateProfile }> = {
		status: 201,
		message: 'Conta criada com sucesso!',
		data: {
			account: newAccount,
			profile: sendProfile
		},
	};

	return response;
}

// async function createNewAccount({ userId, type, data }: CreateNewAccountRequestData): Promise<ApiResponse<{ account: Account }>> {

// 	const accountUser = await accountRepository.getAccountUser(userId);

// if (accountUser) {
// 	apiErrors.Conflict(appMessageErros.accountUser.alreadyExists);
// }

// 	let profile: AccountProfile | null = null;

// 	if (type === 'CANDIDATE') {
// 		profile = await profileRepository.createNewCandidateProfile(data);

// 	} else if (type === 'COMPANY') {
// 		profile = await profileRepository.createNewCompanyProfile(data);
// 	}

// const account = await accountRepository.createAccount({
// 	accountType: type,
// 	profileId: profile.id,
// });

// 	await accountRepository.createAccountUser({
// 		accountId: account.id,
// 		userId,
// 	});

// const response: ApiResponse<{ account: Account }> = {
// 	status: 201,
// 	message: 'Conta criada com sucesso!',
// 	data: {
// 		account,
// 	},
// };

// return response;
// }

// async function getAccountAndAccountProfile(userId: string) {

// 	const { accountId } = await getAccountUserOrThrow(userId);

// 	const account = await getAccountOrThrow(accountId);

// 	const profile = await profileService.getAccountProfile(account);

// 	const response: ApiResponse<{ account: Account; profile: AccountProfile }> = {
// 		status: 200,
// 		message: 'Dados da conta obtidos com sucesso',
// 		data: {
// 			account,
// 			profile,
// 		},
// 	};

// 	return response;
// }

const accountService = {
	checkEmailAvailability,
	createDevAccount,
	// getAccountAndAccountProfile,
	// getUserAccount,
	// getAccountProfile,
	// createNewAccount,
};

export default accountService;
