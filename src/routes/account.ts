import { Router } from 'express';

import profileSchema from '../schemas/profile.js';
import schemaHandler from '../middlewares/schema.js';
import { tokenHandler } from '../middlewares/token.js';
import accountController from '../controllers/account.js';
import developerAccountController from '../controllers/developer/account.js';
import companyAccountController from '../controllers/company/account.js';

const accountRouter = Router();

accountRouter.post('/account/create-dev-account', schemaHandler(profileSchema.developerSchema), developerAccountController.createDeveloperAccount);
accountRouter.post('/account/create-company-account', schemaHandler(profileSchema.companySchema), companyAccountController.createCompanyAccount);

accountRouter.get('/account/get-account-data', tokenHandler, accountController.getAccountData);

export default accountRouter;