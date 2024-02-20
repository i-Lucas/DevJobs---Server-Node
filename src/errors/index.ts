import { ApiMessageErros, apiErrorsMessage } from './api.js';

import { AuthMessageErrors, authMessageErrors } from './user.js';

import {
    AccountMessageErrors,
    accountMessageErrors,
    AccountUserMessageErrors,
    accountUserMessageErrors

} from './account.js';

import { ProfiletMessageErrors, profileMessageErrors } from './profile.js';

import { HiringMessageErrors, hiringMessageErrors } from './hiring.js';

interface ApiError {

    status: number;
    message: string;
}

interface ThrowResponseObject {

    NotFound: (message: string) => ApiError;
    Conflict: (message: string) => ApiError;
    BadRequest: (message: string) => ApiError;
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

    api: ApiMessageErros,
    auth: AuthMessageErrors,
    hiring: HiringMessageErrors,
    account: AccountMessageErrors,
    profile: ProfiletMessageErrors,
    accountUser: AccountUserMessageErrors,
}

export const appMessageErros: AppMessageErrors = {

    api: apiErrorsMessage,
    auth: authMessageErrors,
    hiring: hiringMessageErrors,
    account: accountMessageErrors,
    profile: profileMessageErrors,
    accountUser: accountUserMessageErrors,
};