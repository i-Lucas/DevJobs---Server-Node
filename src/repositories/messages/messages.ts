import db from '../../config/db.js'

import utils from "../../utils/appUtils.js";

import { Message } from '../../models/messages.js';

async function createNewMessage(data: Omit<Message, 'id'  | 'unread' | 'createdAt' | 'updatedAt'>) {

    const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

    return await db.message.create({
        data: {
            ...data,
            unread: true,
            ...createdAtAndUpdatedAt,
        }
    })
}

async function getAllUserMessages(receiverAccountId: string) {

    return await db.message.findMany({
        where: {
            receiverAccountId
        }
    })
}

async function findMessageById(messageId: string) {

    return await db.message.findUnique({
        where: {
            id: messageId
        }
    })
}

async function markAsRead(messageId: string) {

    return await db.message.update({
        where: {
            id: messageId,
        },
        data: {
            unread: false,
            category: 'READ',
            updatedAt: utils.now(),
        }
    })
};

async function deleteMessage(messageId: string) {

    return await db.message.update({
        where: {
            id: messageId
        },
        data: {
            unread: false,
            category: 'TRASH',
            updatedAt: utils.now(),
        }
    })
};

async function restoreMessage(messageId: string) {

    return await db.message.update({
        where: {
            id: messageId
        },
        data: {
            // unread: false,
            category: 'READ',
            updatedAt: utils.now(),
        }
    })
};

async function favoriteMessage(messageId: string) {

    return await db.message.update({
        where: {
            id: messageId
        },
        data: {
            category: 'FAVORITES',
            updatedAt: utils.now(),
        }
    })
}

async function unfavoriteMessage(messageId: string) {

    return await db.message.update({
        where: {
            id: messageId
        },
        data: {
            category: 'READ',
            updatedAt: utils.now(),
        }
    })
}

async function getUnreadMessages(accountId: string) {

    return await db.message.findMany({
        where: {
            receiverAccountId: accountId,
            unread: true
        },
    })
}

const messagesRepository = {
    markAsRead,
    deleteMessage,
    restoreMessage,
    favoriteMessage,
    findMessageById,
    createNewMessage,
    getUnreadMessages,
    unfavoriteMessage,
    getAllUserMessages,
}

export default messagesRepository;