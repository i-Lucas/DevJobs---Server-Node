import { Router } from 'express';

import accountController from '../controllers/account.js';
import { tokenHandler } from '../middlewares/token.js';
import schemaHandler from '../middlewares/schema.js';
import profileSchema from '../schemas/profile.js';

const accountRouter = Router();

accountRouter.post('/account/create-dev-account', schemaHandler(profileSchema.developerSchema), accountController.createDeveloperAccount);
accountRouter.post('/account/create-company-account', schemaHandler(profileSchema.companySchema), accountController.createCompanyAccount);

accountRouter.get('/account/get-account-data', tokenHandler, accountController.getAccountData);
accountRouter.get('/account/check-email-availability/:email', accountController.checkEmailAvailability);

export default accountRouter;