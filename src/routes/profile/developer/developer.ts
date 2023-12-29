import { Router } from 'express';

import { tokenHandler } from '../../../middlewares/token.js';
import developerProfileController from '../../../controllers/developer/profile.js';

const developerRouter = Router();

developerRouter.get('/profile/get-developer-profile/:profileId', tokenHandler, developerProfileController.getDeveloperProfile);

developerRouter.post('/profile/developer/new/field', tokenHandler, developerProfileController.addNewDataFieldInDeveloperProfile);

export default developerRouter;