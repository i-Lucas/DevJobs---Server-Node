export interface User {

    id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserJwtPayload {

    id: string,
    email: string
}

export type CreateNewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type SigninUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;