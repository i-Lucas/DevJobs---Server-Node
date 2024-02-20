import { Router } from 'express';

import userRouter from './user.js';
import accountRouter from './account.js';
import authRouter from './authentication.js';
import companyRouter from './profile/company/company.js';
import developerRouter from './profile/developer/developer.js';
import hiringRouter from './hiring.js';

const appRouter = Router();

appRouter.get('/hello', (req, res) => res.sendStatus(200))

appRouter.use(authRouter);

appRouter.use(userRouter);
appRouter.use(accountRouter);
appRouter.use(companyRouter);
appRouter.use(developerRouter);
appRouter.use(hiringRouter);

export default appRouter;