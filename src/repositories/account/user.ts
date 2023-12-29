import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

import { CreateNewUserAccountData } from '../../models/account.js';

async function createAccountUser(data: CreateNewUserAccountData) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.accountUsers.create({
        data: {
            ...data,
            ...createdAtAndUpdatedAt
        }
    });
}

async function getAccountUser(userId: string) {

    return await db.accountUsers.findUnique({
        where: {
            userId
        }
    });
}

const accountUserRepository = {
    createAccountUser,
    getAccountUser
}

export default accountUserRepository;