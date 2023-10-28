import { Router } from 'express';

import authController from '../controllers/authentication.js';
import schemaHandler from '../middlewares/schema.js';
import authSchemas from '../schemas/authentication.js';

const authRouter = Router();

authRouter.post('/signup', schemaHandler(authSchemas.signup), authController.signup);
authRouter.post('/signin', schemaHandler(authSchemas.signin), authController.signin);

export default authRouter;