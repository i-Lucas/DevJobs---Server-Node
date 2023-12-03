import { Router } from 'express';

import accountController from '../controllers/account.js';
import { tokenHandler } from '../middlewares/token.js';

const accountRouter = Router();

// accountRouter.get('/account/get-account-data', tokenHandler, accountController.getAccountAndAccountProfile);
// accountRouter.get('/account/get-user-account', tokenHandler, accountController.getAccount);
// accountRouter.get('/account/get-account-profile', tokenHandler, accountController.getAccountProfile);
// accountRouter.post('/account/create-new-account', tokenHandler, accountController.createNewAccount);

accountRouter.get('/account/check-email-availability/:email', accountController.checkEmailAvailability)
accountRouter.post('/account/create-dev-account', accountController.createDeveloperAccount)

export default accountRouter;