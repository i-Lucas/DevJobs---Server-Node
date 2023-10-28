import db from '../config/db.js';

import { CreateNewAccountData, CreateNewUserAccountData } from '../models/account.js';

const now = (): string => new Date().getTime().toString();

// --------------------------------------------------------------------------- Account

async function getAccount(accountId: string) {

	return await db.account.findUnique({
		where: {
			id: accountId
		}
	});
}

async function createAccount(data: CreateNewAccountData) {

	return await db.account.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now()
		}
	});
}

// --------------------------------------------------------------------------- Account Users[]

async function getAccountUser(userId: string) {

	return await db.accountUsers.findUnique({
		where: {
			userId
		}
	});
}

async function createAccountUser(data: CreateNewUserAccountData) {

	return await db.accountUsers.create({
		data: {
			...data,
			createdAt: now(),
			updatedAt: now()
		}
	});
}

// --------------------------------------------------------------------------- 

const accountRepository = {
	createAccount,
	getAccount,

	// ---------------- // 

	createAccountUser,
	getAccountUser
};

export default accountRepository;