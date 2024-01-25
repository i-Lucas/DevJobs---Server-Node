import { ApiResponse } from '../models/api.js'

interface MakeResponse<T> {
    data?: T
    status: number
    message: string
}

const now = (): string => new Date().getTime().toString();

const createdAtAndUpdatedAtNow = () => {
    return {
        createdAt: now(),
        updatedAt: now(),
    }
};

function makeResponse<T>({ data, status, message }: MakeResponse<T>) {

    const response: ApiResponse<T> = {
        status,
        message,
        data
    }

    return response
}

const utils = {
    now,
    makeResponse,
    createdAtAndUpdatedAtNow
}

export default utils;