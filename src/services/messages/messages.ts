import { ApiResponse } from '../../models/api.js';
import { AccountType } from '../../models/account.js';
import { Message, NotificationsResponse } from '../../models/messages.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';
import messagesRepository from '../../repositories/messages/messages.js';
import messageBodyHTMLService from './html.js';

interface SendWelcomeMessage {
    receiverName: string;
    receiverEmail: string;
    accountType: AccountType;
    receiverAccountId: string;
}

interface UpdateMessageResponse {
    messageId: string,
    oldCategory: Message['category']
}

async function getMessageOrThrow(messageId: string): Promise<Message> {

    const message = await messagesRepository.findMessageById(messageId);

    if (!message) {
        apiErrors.NotFound(appMessageErros.notifications.notFound)
    }

    return message;
}

async function deleteMessage(_messageId: string) {

    const { id, category: oldCategory } = await getMessageOrThrow(_messageId);

    const { id: messageId } = await messagesRepository.deleteMessage(id);

    const response: ApiResponse<UpdateMessageResponse> = {
        status: 200,
        message: 'Mensagem excluída com sucesso!',
        data: {
            messageId,
            oldCategory
        },
    }

    return response
}

async function favoriteMessage(_messageId: string) {

    const { id, category: oldCategory } = await getMessageOrThrow(_messageId);

    const { id: messageId } = await messagesRepository.favoriteMessage(id);

    const response: ApiResponse<UpdateMessageResponse> = {
        status: 200,
        message: 'Mensagem favoritada com sucesso!',
        data: {
            messageId,
            oldCategory
        },
    }

    return response
}

async function unfavoriteMessage(_messageId: string) {

    const { id, category: oldCategory } = await getMessageOrThrow(_messageId);

    const { id: messageId } = await messagesRepository.unfavoriteMessage(id);

    const response: ApiResponse<UpdateMessageResponse> = {
        status: 200,
        message: 'Mensagem desfavoritada com sucesso!',
        data: {
            messageId,
            oldCategory
        },
    }

    return response
}

async function restoreMessage(_messageId: string) {

    const { id, category: oldCategory } = await getMessageOrThrow(_messageId);

    const { id: messageId } = await messagesRepository.restoreMessage(id);

    const response: ApiResponse<UpdateMessageResponse> = {
        status: 200,
        message: 'Mensagem restaurada com sucesso!',
        data: {
            messageId,
            oldCategory
        },
    }

    return response
}

async function markAsRead(_messageId: string): Promise<ApiResponse<{ messageId: string }>> {

    const message = await getMessageOrThrow(_messageId);

    const { id: messageId, category: oldCategory } = message;

    await messagesRepository.markAsRead(messageId);

    const response: ApiResponse<UpdateMessageResponse> = {
        status: 200,
        data: {
            messageId,
            oldCategory
        },
        message: 'Mensagem lida com sucesso!',
    };

    return response
}

async function sendNewMessage(message: Omit<Message, 'id' | 'unread' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<{ messageId: string }>> {

    const { id: messageId } = await messagesRepository.createNewMessage(message);

    const response: ApiResponse<{ messageId: string }> = {
        status: 200,
        data: { messageId },
        message: 'Mensagens enviada com sucesso!',
    };

    return response
}

async function getAllUserMessages(userAccountId: string): Promise<ApiResponse<NotificationsResponse>> {

    const allUserMessages = await messagesRepository.getAllUserMessages(userAccountId);

    const read = allUserMessages.filter(message => message.category === 'READ');
    const news = allUserMessages.filter(message => message.category === 'NEWS');
    const trash = allUserMessages.filter(message => message.category === 'TRASH');
    const updates = allUserMessages.filter(message => message.category === 'UPDATES');
    const warnings = allUserMessages.filter(message => message.category === 'WARNINGS');
    const favorites = allUserMessages.filter(message => message.category === 'FAVORITES');

    // const unreadCount = updates.length + warnings.length + news.length;

    const unreadCount = await messagesRepository.getUnreadMessages(userAccountId)
    const totalMessagesCount = unreadCount.length + favorites.length + read.length + trash.length

    const response: ApiResponse<NotificationsResponse> = {
        data: {
            messages: {
                news,
                read,
                trash,
                updates,
                warnings,
                favorites,
            },
            info: {
                unread: unreadCount.length,
                total: totalMessagesCount
            }
        },
        status: 200,
        message: 'Mensagens obtidas com sucesso!',
    };

    return response
};

async function sendWelcomeMessage({ accountType, receiverAccountId, receiverEmail, receiverName }: SendWelcomeMessage) {

    const welcomeMessage = accountType === 'CANDIDATE' ?
        messageBodyHTMLService.welcomeMessageForDeveloper(receiverName) :
        messageBodyHTMLService.welcomeMessageForCompany(receiverName);

    await messagesRepository.createNewMessage({
        receiverEmail,
        category: 'NEWS',
        receiverAccountId,
        severity: 'NORMAL',
        provider: 'DEVJOBS',
        senderEmail: 'DevJobs',
        bodyHTML: welcomeMessage,
        subject: 'Bem-vindo(a) ao DevJobs!',
    });
}

const messageService = {
    markAsRead,
    deleteMessage,
    restoreMessage,
    sendNewMessage,
    favoriteMessage,
    unfavoriteMessage,
    getAllUserMessages,
    sendWelcomeMessage,
};

export default messageService;