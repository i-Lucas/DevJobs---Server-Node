import db from '../config/db.js';

import { CreateNewUser } from '../models/user.js';
import userService from '../services/user.js';

const now = (): string => new Date().getTime().toString();

async function createNewUser(data: CreateNewUser) {

	return await db.users.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now(),
			firstName: userService.getUserFirstName(data.name),
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

async function findUserById(id: string) {

	return await db.users.findUnique({
		where: {
			id
		}
	});
}

const userRepository = {
	createNewUser,
	findUserByEmail,
	findUserById
};

export default userRepository;