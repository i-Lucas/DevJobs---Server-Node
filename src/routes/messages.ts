import { Router } from 'express';
import { tokenHandler } from '../middlewares/token.js';
import messagesController from '../controllers/messages.js';

const messagesRouter = Router();

messagesRouter.get('/messages/all', tokenHandler, messagesController.getAllMessages);
messagesRouter.post('/messages/read/:messageId', tokenHandler, messagesController.markAsRead);

messagesRouter.post('/messages/delete/:messageId', tokenHandler, messagesController.deleteMessage);
messagesRouter.post('/messages/restore/:messageId', tokenHandler, messagesController.restoreMessage);
messagesRouter.post('/messages/favorite/:messageId', tokenHandler, messagesController.favoriteMessage);
messagesRouter.post('/messages/unfavorite/:messageId', tokenHandler, messagesController.unfavoriteMessage);

export default messagesRouter;