import bcrypt from 'bcrypt';

import { ApiResponse } from '../../models/api.js';
import { apiErrors, appMessageErros } from "../../errors/index.js";

import userRepository from "../../repositories/user/user.js";

import companyProfileRepository from '../../repositories/profile/company.js';
import { CreateCompanyAccountRequest } from "../../models/profile/company.profile.js";

async function createCompanyAccount(profile: CreateCompanyAccountRequest) {

	const findUser = await userRepository.getUserAndAccountByEmail(profile.account.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const password = await bcrypt.hash(profile.account.password, 10);

	const { id: profileId } = await companyProfileRepository.createCompanyProfile(profile);

	const { id: userId, accountId } = await userRepository.createNewUserAccount({
		user: {
			password,
			name: profile.account.name,
			email: profile.account.email,
		},
		account: {
			profileId,
			accountType: 'COMPANY',
		}
	});

	const response: ApiResponse<{ userId: string, profileId: string, accountId: string }> = {
		status: 201,
		message: 'Conta criada com sucesso!',
		data: {
			userId,
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