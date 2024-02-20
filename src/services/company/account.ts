import bcrypt from 'bcrypt';

import { ApiResponse } from '../../models/api.js';
import { apiErrors, appMessageErros } from "../../errors/index.js";

import userRepository from "../../repositories/user/user.js";
import accountRepository from '../../repositories/account/account.js';
import accountUserRepository from '../../repositories/account/user.js';
import companyProfileRepository from '../../repositories/profile/company.js';
import { CreateCompanyAccountRequest, NewCompanyProfile } from "../../models/profile/company.profile.js";

async function createCompanyAccount(profile: CreateCompanyAccountRequest) {

	const findUser = await userRepository.findUserByEmail(profile.account.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const password = await bcrypt.hash(profile.account.password, 10);

	const { id: userId } = await userRepository.createNewUser({
		name: profile.account.name,
		email: profile.account.email,
		password
	});

	const newProfile: NewCompanyProfile = {
		...profile,
		userId
	}

	const { id: profileId } = await companyProfileRepository.createCompanyProfile(newProfile);

	const { id: accountId } = await accountRepository.createAccount({
		accountType: 'COMPANY', profileId
	});

	await accountUserRepository.createAccountUser({ accountId, userId });

	const response: ApiResponse<{ profileId: string, accountId: string }> = {
		status: 201,
		message: 'Conta criada com sucesso!',
		data: {
			accountId,
			profileId
		}
	};

	return response;
}

const companyAccountService = {
	createCompanyAccount
}

export default companyAccountService;