import { Router } from 'express';

import { tokenHandler } from '../../../middlewares/token.js';
import companyProfileController from '../../../controllers/company/profile.js';

const companyRouter = Router();

companyRouter.get('/profile/get-company-profile/:profileId', tokenHandler, companyProfileController.getCompanyProfile);

companyRouter.post('/profile/company/update', tokenHandler, companyProfileController.updateCompanyProfile);

export default companyRouter;