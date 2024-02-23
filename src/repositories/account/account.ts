import db from '../../config/db.js';
import utils from '../../utils/appUtils.js';

async function getAccountByProfileId(profileId: string) {

    return await db.account.findUnique({
        where: {
            profileId
        }
    })
};

async function getAccountWithUserId(accountId: string) {

    return await db.account.findUnique({
        where: {
            id: accountId
        },
        select: {
            users: {
                select: {
                    id: true
                }
            },
            profileId: true
        }
    });
};

async function getAccount(accountId: string) {

    return await db.account.findUnique({
        where: {
            id: accountId
        },
    });
}

const accountRepository = {

    getAccount,
    // createAccount,
    getAccountWithUserId,
    getAccountByProfileId,
};

export default accountRepository;