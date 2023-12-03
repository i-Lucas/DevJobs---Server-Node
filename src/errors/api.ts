export interface ApiMessageErros {
    
    manyRequests: string;
}

export const apiErrorsMessage: ApiMessageErros = {
	manyRequests: 'Muitas tentativas, tente novamente mais tarde.'
};