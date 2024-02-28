import { AccountType } from './account.js';

type MessageProvider = AccountType | 'DEVJOBS';

type MessageSeverity = 'INFO' | 'WARN' | 'SUCCESS' | 'ERROR' | 'NORMAL';
type MessageCategory = 'TRASH' | 'FAVORITES' | 'WARNINGS' | 'NEWS' | 'READ' | 'UPDATES'

export interface Notifications {

    news: Message[];
    read: Message[];
    trash: Message[];
    updates: Message[];
    warnings: Message[];
    favorites: Message[];
}

export interface Message {

    id: string;

    bodyHTML: string;
    subject: string;

    senderEmail: string;
    receiverEmail: string;
    receiverAccountId: string;

    category: MessageCategory;
    severity: MessageSeverity
    provider: MessageProvider;

    unread: boolean

    createdAt: string
    updatedAt: string
}

export interface NotificationsResponse {
    
    messages: Notifications,
    info: {
        unread: number,
        total: number
    }
}