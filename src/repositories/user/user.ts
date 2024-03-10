import db from '../../config/db.js';
import appConfig from '../../config/app.js';

import utils from '../../utils/appUtils.js';
import { AccountType } from '../../models/account.js';
import { CreateNewUserAccount, User } from '../../models/user.js';

interface GetUserJwtDataPayload {
	Account: {
		id: string,
		profileId: string,
		accountType: AccountType
	}
}

async function createNewUserAccount({ user, account }: CreateNewUserAccount) {

	const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

	const picture = appConfig.client.user.default_picture;

	return await db.users.create({
		data: {
			...user,
			...createdAtAndUpdatedAt,
			photo: picture,
			Account: {
				create: {
					ownerEmail: user.email,
					...createdAtAndUpdatedAt,
					profileId: account.profileId,
					accountType: account.accountType,
				},
			},
		}
	});
};

async function getOnlyUserEmail(email: string) {

	return await db.users.findUnique({
		where: {
			email
		},
		select: {
			email: true
		}
	});
};

async function getUserAndAccountByEmail(email: string): Promise<User & GetUserJwtDataPayload> {

	return await db.users.findUnique({
		where: {
			email
		},
		include: {
			Account: {
				select: {
					id: true,
					profileId: true,
					accountType: true
				}
			}
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

async function getUserEmailByUserId(userId: string) {

	return await db.users.findUnique({
		where: {
			id: userId
		},
		select: {
			email: true
		}
	})
}

const userRepository = {
	findUserById,
	getOnlyUserEmail,
	getUserEmailByUserId,
	createNewUserAccount,
	getUserAndAccountByEmail,
};

export default userRepository;