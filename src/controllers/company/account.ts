import { Request, Response } from 'express';
import companyAccountService from '../../services/company/account.js';

async function createCompanyAccount(req: Request, res: Response) {

	// await new Promise((resolve) => setTimeout(resolve, 3500));

	const response = await companyAccountService.createCompanyAccount(req.body);

	return res.status(response.status).json(response);
}

const companyAccountController = {
	createCompanyAccount
}

export default companyAccountController;