import { Router } from 'express';

import { tokenHandler } from '../middlewares/token.js';

import developerHiringController from '../controllers/developer/hiring.js';

const applicationsRouter = Router();

applicationsRouter.get('/applications/get/all', tokenHandler, developerHiringController.getAllUserApplications);

export default applicationsRouter;