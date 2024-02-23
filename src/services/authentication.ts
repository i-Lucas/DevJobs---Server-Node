import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/index.js';

import { SigninUser, UserJwtPayload } from '../models/user.js';
import userRepository from '../repositories/user/user.js';

import { apiErrors, appMessageErros } from '../errors/index.js';

async function signin({ email, password }: SigninUser) {

	const user = await userRepository.getUserAndAccountByEmail(email);

	if (!user) {
		apiErrors.NotFound(appMessageErros.auth.user.notFound);
	};

	if (!(await bcrypt.compare(password, user.password))) {
		apiErrors.Unauthorized(appMessageErros.auth.user.invalidPassword);
	}

	const payload: UserJwtPayload = {
		userId: user.id,
		email: user.email,
		accountId: user.Account.id,
		profileId: user.Account.profileId
	};

	return jwt.sign(payload, config.api.env.JWT_SECRET, {
		expiresIn: config.auth.token.expiration
	})
};

export const authService = {
	signin
};