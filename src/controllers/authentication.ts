import { Request, Response } from 'express';

import { ApiResponse } from '../models/api.js';

import { authService } from '../services/authentication.js';

async function signin(req: Request, res: Response) {

	const data: { email: string; password: string } = req.body;
	const token = await authService.signin(data);

	// await new Promise((resolve) => setTimeout(resolve, 3200));

	const response: ApiResponse<{ token: string }> = {
		status: 200,
		message: 'Login efetuado com sucesso!',
		data: {
			token
		}
	};

	return res.status(response.status).json(response);
}

const authController = {
	signin
};

export default authController;
