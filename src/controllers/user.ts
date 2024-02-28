import { Request, Response } from 'express';

import userService from '../services/user.js';

async function checkEmailAvailability(req: Request, res: Response) {

	const { email } = req.params;

	await new Promise((resolve) => setTimeout(resolve, 2900));

	const response = await userService.checkEmailAvailability(email);
	
	return res.status(response.status).json(response);
};

const userController = {
	checkEmailAvailability
};

export default userController;