import { ApiMessageErros, apiErrorsMessage } from './api.js';

import { AuthMessageErrors, authMessageErrors } from './user.js';

import { AccountMessageErrors, AccountUserMessageErrors, accountMessageErrors, accountUserMessageErrors } from './account.js';

interface ApiError {

    status: number;
    message: string;
}

interface ThrowResponseObject {

    NotFound: (message: string) => ApiError;
    BadRequest: (message: string) => ApiError;
    Conflict: (message: string) => ApiError;
    Unauthorized: (message: string) => ApiError;
    UnprocessableEntity: (message: string) => ApiError;
    InternalServerError: (message: string) => ApiError;
}

export const apiErrors: ThrowResponseObject = {

    NotFound: (message: string) => { throw { status: 404, message }; },
    Conflict: (message: string) => { throw { status: 409, message }; },
    BadRequest: (message: string) => { throw { status: 400, message }; },
    Unauthorized: (message: string) => { throw { status: 401, message }; },
    UnprocessableEntity: (message: string) => { throw { status: 422, message }; },
    InternalServerError: (message: string) => { throw { status: 500, message }; }
};

interface AppMessageErrors {

    auth: AuthMessageErrors,
    api: ApiMessageErros,
    account: AccountMessageErrors,
    accountUser: AccountUserMessageErrors
}

export const appMessageErros: AppMessageErrors = {

    auth: { ...authMessageErrors },
    api: { ...apiErrorsMessage },
    account: { ...accountMessageErrors },
    accountUser: { ...accountUserMessageErrors }
};