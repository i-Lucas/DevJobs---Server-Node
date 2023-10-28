import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

import config from '../config/index.js';
import { apiErrors, appMessageErros } from '../errors/index.js';
import { CreateNewUser, SigninUser } from '../models/user.js';
import userRepository from '../repositories/user.js';

async function signup({ email, password }: CreateNewUser) {

	email = email.toLowerCase();
	const findUser = await userRepository.findUserByEmail(email);
	if (findUser) apiErrors.Conflict(appMessageErros.auth.user.emailAlreadyUse);

	password = await bcrypt.hash(password, 10);
	await userRepository.createNewUser({ email, password });
}

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

	const token = jwt.sign(payload, config.api.env.JWT_SECRET, { expiresIn: config.auth.token.expiration });
	return CryptoJS.AES.encrypt(token, config.api.env.KEY_SECRET).toString();
}

export const authService = {
	signin,
	signup
};