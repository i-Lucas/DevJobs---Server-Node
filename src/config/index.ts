import apiConfig from './api.js';
import authConfig from './auth.js';

import { ApiConfig } from '../models/api.js';
import { UserAuthConfig } from '../models/auth.js';

interface AppConfig {
    api: ApiConfig,
    auth: UserAuthConfig
}

const config: AppConfig = {
	api: apiConfig,
	auth: authConfig
};

export default config;