export interface AuthMessageErrors {

    user: {
        notFound: string;
        invalidPassword: string;
        emailAlreadyUse: string;
    }
}

export const authMessageErrors: AuthMessageErrors = {

    user: {
        notFound: 'Usuário não encontrado',
        invalidPassword: 'Usuário ou senha inválidos',
        emailAlreadyUse: 'Email em uso',
    }
};