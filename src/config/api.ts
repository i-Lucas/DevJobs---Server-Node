import dotenv from 'dotenv';

import { ApiConfig } from '../models/api.js';

dotenv.config();

const minutes: number = 10;

const apiConfig: ApiConfig = {

	requests: {
		timeIntervalMinutes: minutes * 60 * 1000,
		maxRequests: 100
	},

	env: {
		PORT: process.env.PORT,
		KEY_SECRET: process.env.KEY_SECRET,
		JWT_SECRET: process.env.JWT_SECRET
	}
};

export default apiConfig;