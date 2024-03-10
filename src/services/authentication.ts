import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";

import config from '../config/index.js';

import { SigninUser, UserJwtPayload } from '../models/user.js';
import userRepository from '../repositories/user/user.js';

import { apiErrors, appMessageErros } from '../errors/index.js';

async function signin({ email, password }: SigninUser): Promise<string> {

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
		profileId: user.Account.profileId,
		accountType: user.Account.accountType
	};

	const token = jwt.sign(payload, config.api.env.JWT_SECRET, {
		expiresIn: config.auth.token.expiration
	});

	return CryptoJS.AES.encrypt(token, config.api.env.KEY_SECRET).toString();
};

export const authService = {
	signin,
};