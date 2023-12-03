export interface AccountMessageErrors {

    notFound: string;
    invalidType: string;
}

export interface AccountUserMessageErrors {

    notFound: string;
    alreadyExists: string;
}

export const accountMessageErrors: AccountMessageErrors = {
    notFound: 'Conta não encontrada',
    invalidType: 'Tipo de conta inválido',
};

export const accountUserMessageErrors: AccountUserMessageErrors = {
    notFound: 'Nenhuma conta vinculada ao usuário foi encontrada',
    alreadyExists: 'Usuário já possuí conta vinculada'
};