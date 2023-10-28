import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';

import accountService from '../services/account.js';

async function getAccount(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;
	const response = await accountService.getUserAccount(userId);

	return res.status(response.status).json(response);
}

async function getAccountProfile(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;
	const response = await accountService.getAccountProfile(userId);

	return res.status(response.status).json(response);
}

async function createNewAccount(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;

	const { data, type } = req.body;

	if (!data || !type) {

		return res.status(422).json({
			status: 422,
			message: 'Tipo da conta ou dados inválidos'
		});
	}

	const response = await accountService.createNewAccount({
		data, type, userId
	});

	return res.status(response.status).json(response);
}

async function getAccountAndAccountProfile(req: Request, res: Response) {

	const { id: userId }: UserJwtPayload = res.locals.user;
	const response = await accountService.getAccountAndAccountProfile(userId);

	return res.status(response.status).json(response);
}

const accountController = {
	getAccountAndAccountProfile,
	getAccountProfile,
	createNewAccount,
	getAccount
};

export default accountController;