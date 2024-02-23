import { Router } from 'express';

import userRouter from './user.js';
import offerRouter from './offer.js';
import hiringRouter from './hiring.js';
import accountRouter from './account.js';
import authRouter from './authentication.js';
import companyRouter from './profile/company/company.js';
import developerRouter from './profile/developer/developer.js';

const appRouter = Router();

appRouter.use(authRouter);

appRouter.use(userRouter);
appRouter.use(offerRouter);
appRouter.use(hiringRouter);
appRouter.use(accountRouter);
appRouter.use(companyRouter);
appRouter.use(developerRouter);

export default appRouter;