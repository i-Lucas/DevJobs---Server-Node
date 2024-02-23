import joi from 'joi';
import { CreateNewUserAccount } from '../models/user.js';

const signup = joi.object<CreateNewUserAccount['user']>({

	email: joi.string().email().required(),
	password: joi.string().min(5).required(),
});

const signin = joi.object<CreateNewUserAccount['user']>({

	email: joi.string().email().required(),
	password: joi.string().required(),
});

const authSchemas = {
	signup,
	signin
};

export default authSchemas;