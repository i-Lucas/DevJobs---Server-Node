import { Request, Response } from 'express';
import developerAccountService from '../../services/developer/account.js';

async function createDeveloperAccount(req: Request, res: Response) {

	await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await developerAccountService.createDeveloperAccount(req.body);

	return res.status(response.status).json(response);
};

const developerAccountController = {
	createDeveloperAccount
};

export default developerAccountController;