import { Request, Response } from 'express';

import { ApiResponse } from '../models/api.js';

import { authService } from '../services/authentication.js';

async function signin(req: Request, res: Response): Promise<ApiResponse<{ token: string }>> {

	const data: { email: string; password: string } = req.body;
	const token = await authService.signin(data);

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

async function signup(req: Request, res: Response): Promise<ApiResponse<null>> {

	const data: { email: string; password: string } = req.body;
	await authService.signup(data);

	const response: ApiResponse<null> = {
		status: 201,
		message: 'Usuário cadastrado com sucesso!',
	};

	res.send(response);
	return response;
}

const authController = {
	signin,
	signup
};

export default authController;
