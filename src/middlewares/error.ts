/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction): Response {

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json({
			status: 401,
			message: 'Token expirado'
		});
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({
			status: 401,
			message: 'Token inválido'
		});
	}

	if (error.status && error.message) {
		return res.status(error.status).json({
			status: error.status,
			message: error.message
		});
	}

	if (error.response) {
		return res.status(error.response.status).json({
			status: error.response.status,
			message: error.message
		});
	}

	return res.status(500).json({
		status: 500,
		message: 'Erro interno do servidor',
		data: {
			error
		}
	});
}