import { Router } from 'express';

import schemaHandler from '../middlewares/schema.js';
import { tokenHandler } from '../middlewares/token.js';

import companyHiringController from '../controllers/company/hiring.js';

const hiringRouter = Router();

hiringRouter.post('/hiring/new', tokenHandler, companyHiringController.startHiringProcess);
hiringRouter.get('/hiring/get', tokenHandler, companyHiringController.getCompanyHiringProcess);

export default hiringRouter;
