import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';

import accountService from '../services/account.js';

// async function getAccount(req: Request, res: Response) {

// 	const { id: userId }: UserJwtPayload = res.locals.user;
// 	const response = await accountService.getUserAccount(userId);

// 	return res.status(response.status).json(response);
// }

// async function getAccountProfile(req: Request, res: Response) {

// 	const { id: userId }: UserJwtPayload = res.locals.user;
// 	const response = await accountService.getAccountProfile(userId);

// 	return res.status(response.status).json(response);
// }

async function checkEmailAvailability(req: Request, res: Response) {

	const { email } = req.params;

	const response = await accountService.checkEmailAvailability(email);
	return res.status(response.status).json(response);
}

async function createDeveloperAccount(req: Request, res: Response) {

	const { profile, account } = req.body;

	const response = await accountService.createDevAccount({ profile, account });
	return res.status(response.status).json(response);
}

// async function createNewAccount(req: Request, res: Response) {

// 	const { id: userId }: UserJwtPayload = res.locals.user;

// 	const { data, type } = req.body;

// 	console.log(data, type)

// 	if (!data || !type) {

// 		return res.status(422).json({
// 			status: 422,
// 			message: 'Tipo da conta ou dados inválidos'
// 		});
// 	}

// 	const response = await accountService.createNewAccount({
// 		data, type, userId
// 	});

// 	return res.status(response.status).json(response);
// }

async function getAccountAndAccountProfile(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;	

	await new Promise((resolve) => setTimeout(resolve, 5000));

	const response = await accountService.getAccountAndAccountProfile(userId);

	return res.status(response.status).json(response);
}

const accountController = {
	checkEmailAvailability,
	createDeveloperAccount,
	getAccountAndAccountProfile,
	// getAccountProfile,
	// createNewAccount,
	// getAccount
};

export default accountController;