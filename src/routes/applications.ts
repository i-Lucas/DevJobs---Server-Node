import { Router } from 'express';

import { tokenHandler } from '../middlewares/token.js';

import developerHiringController from '../controllers/developer/hiring.js';

const applicationsRouter = Router();

applicationsRouter.get('/applications/all', tokenHandler, developerHiringController.getAllUserApplications);
applicationsRouter.get('/applications/get/:processId', tokenHandler, developerHiringController.getApplicationById);

export default applicationsRouter;