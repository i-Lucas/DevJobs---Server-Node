import bcrypt from 'bcrypt';
import pkg from '@prisma/client';

import utils from '../../../utils/appUtils.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

interface NewAccount {
    email: string;
    password: string;
}

async function createUserAccount({ email, password }: NewAccount) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    const userAccount = await prisma.users.create({
        data: {
            email,
            name: 'Lucas Oliveira',
            password: await bcrypt.hash(password, 10),
            photo: '',
            Account: {
                create: {
                    accountType: 'ADMIN',
                    ownerEmail: email,
                    profileId: '',
                    ...createdAtAndUpdatedAt,
                },
            },
            ...createdAtAndUpdatedAt,
        }
    });

    return userAccount;
}

const mockFunctionsModule = {
    createUserAccount
};

export default mockFunctionsModule;