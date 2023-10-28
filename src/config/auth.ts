import { UserAuthConfig } from '../models/auth.js';

const token_expiration_hours: number = 6;

const authConfig: UserAuthConfig = {
	token: {
		expiration: 60 * 60 * token_expiration_hours
	}
};

export default authConfig;