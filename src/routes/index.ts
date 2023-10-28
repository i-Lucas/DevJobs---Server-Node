import { Router } from 'express';

import accountRouter from './account.js';
import authRouter from './authentication.js';

const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(accountRouter);

export default appRouter;