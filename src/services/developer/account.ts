import bcrypt from 'bcrypt';

import { ApiResponse } from '../../models/api.js';
import userRepository from "../../repositories/user/user.js";
import { apiErrors, appMessageErros } from "../../errors/index.js";
import accountRepository from "../../repositories/account/account.js";
import accountUserRepository from '../../repositories/account/user.js';
import developerProfileRepository from "../../repositories/profile/developer.js";
import { CreateDeveloperAccountRequest } from "../../models/profile/candidate.profile.js";

async function createDevAccount(profile: CreateDeveloperAccountRequest) {

	const findUser = await userRepository.findUserByEmail(profile.contact.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const { id: profileId } = await developerProfileRepository.createDeveloperProfile(profile);

	const { id: accountId } = await accountRepository.createAccount({
		accountType: 'CANDIDATE', profileId
	});

	const password = await bcrypt.hash(profile.password.password, 10);

	const { id: userId } = await userRepository.createNewUser({
		name: profile.about.name,
		email: profile.contact.email,
		password
	});

	await accountUserRepository.createAccountUser({ accountId, userId });

	const response: ApiResponse<{}> = {
		status: 201, message: 'Conta criada com sucesso!',
	};

	return response;
};

const developerAccountService = {
	createDeveloperAccount: createDevAccount
}

export default developerAccountService;