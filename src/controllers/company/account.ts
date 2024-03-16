import { Request, Response } from 'express';
import companyAccountService from '../../services/company/account.js';

async function createCompanyAccount(req: Request, res: Response) {

	const response = await companyAccountService.createCompanyAccount(req.body);
	
	await new Promise((resolve) => setTimeout(resolve, 850));

	return res.status(response.status).json(response);
}

const companyAccountController = {
	createCompanyAccount
}

export default companyAccountController;