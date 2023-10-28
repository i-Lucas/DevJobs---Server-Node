export type AccountType = 'ADMIN' | 'COMPANY' | 'CANDIDATE';

export interface Account {

    id: string;

    profileId: string;
    accountType: AccountType;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewAccountData = Omit<Account, 'id' | 'updatedAt' | 'createdAt'>;

export interface UserAccount {

    id: string;

    userId: string;
    accountId: string;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewUserAccountData = Omit<UserAccount, 'id' | 'updatedAt' | 'createdAt'>;