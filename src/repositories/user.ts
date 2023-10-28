import db from '../config/db.js';

import { CreateNewUser } from '../models/user.js';

const now = (): string => new Date().getTime().toString();

async function createNewUser(data: CreateNewUser) {

	return await db.users.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now()
		}
	});
}

async function findUserByEmail(email: string) {

	return await db.users.findUnique({
		where: {
			email
		}
	});
}

const userRepository = {
	createNewUser,
	findUserByEmail
};

export default userRepository;