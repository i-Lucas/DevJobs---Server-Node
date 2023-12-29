import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/index.js';

import { SigninUser } from '../models/user.js';
import userRepository from '../repositories/user/user.js';

import { apiErrors, appMessageErros } from '../errors/index.js';

async function signin({ email, password }: SigninUser) {

	const user = await userRepository.findUserByEmail(email);
	if (!user) apiErrors.NotFound(appMessageErros.auth.user.notFound);

	if (!(await bcrypt.compare(password, user.password))) {
		apiErrors.Unauthorized(appMessageErros.auth.user.invalidPassword);
	}

	const payload = {
		id: user.id,
		email: user.email
	};

	return jwt.sign(payload, config.api.env.JWT_SECRET, {
		expiresIn: config.auth.token.expiration
	})
};

export const authService = {
	signin
};