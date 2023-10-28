export interface ApiErrorResponse {
    status: number;
    message: string;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data?: T
}

export interface ApiConfig {

    requests: {
        timeIntervalMinutes: number;
        maxRequests: number;
    },

    env: {
        KEY_SECRET: string;
        JWT_SECRET: string;
        PORT: string;
    }
}