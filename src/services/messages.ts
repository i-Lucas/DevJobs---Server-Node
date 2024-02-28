import { ApiResponse } from '../models/api.js';
import { AccountType } from '../models/account.js';
import { Message, NotificationsResponse } from '../models/messages.js';

import { apiErrors, appMessageErros } from '../errors/index.js';
import messagesRepository from '../repositories/messages/messages.js';

interface SendWelcomeMessage {
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

async function sendNewMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<{ messageId: string }>> {

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

async function sendWelcomeMessage({ accountType, receiverAccountId, receiverEmail }: SendWelcomeMessage) {

    let welcomeMessage: string;

    if (accountType === 'CANDIDATE') {

        welcomeMessage = `
            <div>
                <h1>Bem-vindo(a) ao DevJobs!</h1>
                <p>Você acaba de entrar para a maior plataforma de recrutamento e gerenciamento de processos seletivos do Brasil!</p>
                <p>Aqui, conectamos talentos como você às melhores oportunidades de emprego na área do desenvolvimento.</p>                                
                <p>Além disso, oferecemos ferramentas poderosas para acompanhar suas candidaturas e simplificar seu processo de busca por emprego.</p>
                <p>Fique atento(a) às novidades e oportunidades que compartilhamos diariamente.</p>
                <p>Seja bem-vindo(a) e boa sorte em sua jornada conosco!</p>
                <p>Atenciosamente, DevJobs</p>
            </div>
        `;

    } else {

        welcomeMessage = `
            <div>
                <h1>Bem-vindo(a) ao DevJobs!</h1>
                <p>Sua empresa agora faz parte da maior plataforma de recrutamento e gerenciamento de processos seletivos do Brasil!</p>
                <p>Aqui, oferecemos um conjunto abrangente de ferramentas para otimizar seu processo de contratação.</p>
                <p>Com nossas ferramentas avançadas de gerenciamento de candidatos, você pode facilmente acompanhar o progresso das suas vagas e gerenciar os candidatos de forma intuitiva e eficiente.</p>
                <p>Além disso, fornecemos insights valiosos por meio de estatísticas detalhadas, permitindo que você tome decisões informadas ao encontrar os melhores talentos para suas vagas.</p>
                <p>Acompanhe as estatísticas da sua empresa, encontre os melhores candidatos para suas vagas e simplifique seu processo seletivo conosco!</p>
                <p>Fique atento(a) às novidades e recursos que disponibilizamos para otimizar seu processo de contratação.</p>
                <p>Seja bem-vindo(a) e aproveite ao máximo sua experiência conosco!</p>
                <p>Atenciosamente, DevJobs</p>
            </div>
        `;
    }

    await messagesRepository.createNewMessage({
        unread: true,
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