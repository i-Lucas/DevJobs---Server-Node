import bcrypt from 'bcrypt';

import { ApiResponse } from '../../models/api.js';
import { apiErrors, appMessageErros } from "../../errors/index.js";

import userRepository from "../../repositories/user/user.js";

import developerProfileRepository from '../../repositories/profile/developer/index.js';
import { CreateDeveloperAccountRequest } from "../../models/profile/candidate.profile.js";

async function createDeveloperAccount(profile: CreateDeveloperAccountRequest) {

	const findUser = await userRepository.getUserAndAccountByEmail(profile.contact.email);

	if (findUser) {
		apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);
	}

	const password = await bcrypt.hash(profile.password.password, 10);

	const { id: profileId } = await developerProfileRepository.create.profile(profile);

	const { id: userId, accountId } = await userRepository.createNewUserAccount({
		user: {
			password,
			name: profile.about.name,
			email: profile.contact.email,
		},
		account: {
			profileId,
			accountType: 'CANDIDATE',
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

const developerAccountService = {
	createDeveloperAccount
}

export default developerAccountService;