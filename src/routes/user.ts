import { Router } from 'express';
import userController from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/account/check-email-availability/:email', userController.checkEmailAvailability);

export default userRouter;