import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';

import accountService from '../services/account.js';

async function checkEmailAvailability(req: Request, res: Response) {

	const { email } = req.params;

	await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await accountService.checkEmailAvailability(email);
	return res.status(response.status).json(response);
}

async function createDeveloperAccount(req: Request, res: Response) {

	await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await accountService.createDevAccount(req.body);
	
	return res.status(response.status).json(response);
}

async function createCompanyAccount(req: Request, res: Response) {

	await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await accountService.createCompanyAccount(req.body);

	return res.status(response.status).json(response);
}

async function getAccountData(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;

	await new Promise((resolve) => setTimeout(resolve, 2500));

	const response = await accountService.getAccountData(userId);

	return res.status(response.status).json(response);
}

const accountController = {

	createCompanyAccount,
	checkEmailAvailability,
	createDeveloperAccount,
	getAccountData,
};

export default accountController;