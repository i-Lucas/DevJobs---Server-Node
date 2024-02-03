import { Request, Response } from 'express';

import { ApiResponse } from '../models/api.js';

import { authService } from '../services/authentication.js';

async function signin(req: Request, res: Response): Promise<ApiResponse<{ token: string }>> {

	const data: { email: string; password: string } = req.body;
	const token = await authService.signin(data);

	// await new Promise((resolve) => setTimeout(resolve, 2500));

	const response: ApiResponse<{ token: string }> = {
		status: 200,
		message: 'Login efetuado com sucesso!',
		data: {
			token
		}
	};

	res.send(response);
	return response;
}

const authController = {
	signin
};

export default authController;
