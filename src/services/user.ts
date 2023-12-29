import { User } from "../models/user";

import { ApiResponse } from "../models/api.js";
import userRepository from "../repositories/user/user.js";
import { apiErrors, appMessageErros } from "../errors/index.js";

async function getUserOrThrow(email: string): Promise<User> {

    const findUser = await userRepository.findUserByEmail(email);

    if (!findUser) {
        apiErrors.NotFound(appMessageErros.auth.user.notFound);
    }

    return findUser;
}

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

const userService = {

    getUserOrThrow,
	checkEmailAvailability
}

export default userService;