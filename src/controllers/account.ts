import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';
import accountService from '../services/account.js';

async function getAccountData(req: Request, res: Response) {

	const { userId, profileId, accountId }: UserJwtPayload = res.locals.user;

	// await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await accountService.getAccountData({ userId, profileId, accountId });

	return res.status(response.status).json(response);
}

const accountController = {
	getAccountData,
};

export default accountController;