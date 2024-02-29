import { Router } from 'express';

import { tokenHandler } from '../../../middlewares/token.js';
import developerProfileController from '../../../controllers/developer/profile.js';

const developerRouter = Router();

developerRouter.get('/profile/get-developer-profile/:profileId', tokenHandler, developerProfileController.getDeveloperProfile);

developerRouter.post('/profile/developer/update', tokenHandler, developerProfileController.updateDeveloperProfile);

developerRouter.post('/profile/developer/delete', tokenHandler, developerProfileController.deleteDeveloperProfileField);

developerRouter.post('/profile/developer/add', tokenHandler, developerProfileController.addDeveloperProfileField);

developerRouter.get('/profile/developer/talents', tokenHandler, developerProfileController.getDeveloperTalents);

export default developerRouter;