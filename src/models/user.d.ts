import { AccountType } from './account.js';

export interface User {

    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserJwtPayload {

    email: string,
    userId: string,
    accountId: string;
    profileId: string;
    accountType: AccountType;
}

export interface CreateNewUserAccount {

	user: {
		email: string;
		name: string;
		password: string;
	}
	account: {
		profileId: string
		accountType: AccountType
	}
}

export type SigninUser = Omit<User, 'id' | 'name' | 'createdAt' | 'updatedAt'>;