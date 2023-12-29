import db from '../../config/db.js';
import appConfig from '../../config/app.js';

import utils from '../../utils/appUtils.js';
import { CreateNewUser } from '../../models/user.js';

async function createNewUser(data: CreateNewUser) {

	const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

	return await db.users.create({
		data: {
			...data,
			...createdAtAndUpdatedAt,
			photo: appConfig.client.user.default_picture
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