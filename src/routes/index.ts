import { Router } from 'express';

import userRouter from './user.js';
import offerRouter from './offer.js';
import hiringRouter from './hiring.js';
import accountRouter from './account.js';
import messagesRouter from './messages.js';
import authRouter from './authentication.js';
import applicationsRouter from './applications.js';
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
appRouter.use(messagesRouter);
appRouter.use(applicationsRouter);

export default appRouter;