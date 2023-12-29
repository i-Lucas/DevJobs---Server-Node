import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import { CreateNewAccountData } from '../../models/account.js';

async function getAccountByProfileId(profileId: string) {

    return await db.account.findUnique({
        where: {
            profileId
        }
    })
};

async function getAccount(accountId: string) {

    return await db.account.findUnique({
        where: {
            id: accountId
        }
    });
}

async function createAccount(data: CreateNewAccountData) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.account.create({
        data: {
            ...data,
            ...createdAtAndUpdatedAt
        }
    });
}

const accountRepository = {

    createAccount,
    getAccount,
    getAccountByProfileId,
};

export default accountRepository;