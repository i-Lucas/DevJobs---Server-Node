import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';
import messageService from '../services/messages/messages.js';

async function restoreMessage(req: Request, res: Response) {

    const { messageId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await messageService.restoreMessage(messageId);

    return res.status(response.status).json(response);
}

async function favoriteMessage(req: Request, res: Response) {

    const { messageId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await messageService.favoriteMessage(messageId);

    return res.status(response.status).json(response);
}

async function unfavoriteMessage(req: Request, res: Response) {

    const { messageId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await messageService.unfavoriteMessage(messageId);

    return res.status(response.status).json(response);
}

async function deleteMessage(req: Request, res: Response) {

    const { messageId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await messageService.deleteMessage(messageId);

    return res.status(response.status).json(response);
}

async function markAsRead(req: Request, res: Response) {

    const { messageId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 850));

    const response = await messageService.markAsRead(messageId);

    return res.status(response.status).json(response);
}

async function getAllMessages(req: Request, res: Response) {

    await new Promise((resolve) => setTimeout(resolve, 850));

    const { accountId }: UserJwtPayload = res.locals.user;

    const response = await messageService.getAllUserMessages(accountId);

    return res.status(response.status).json(response);
}

const messagesController = {
    markAsRead,
    deleteMessage,
    getAllMessages,
    restoreMessage,
    favoriteMessage,
    unfavoriteMessage,
}

export default messagesController;