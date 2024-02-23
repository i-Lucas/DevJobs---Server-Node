import { Router } from 'express';

import { tokenHandler } from '../middlewares/token.js';
import jobOfferController from '../controllers/offer.js';

const offerRouter = Router();

offerRouter.get('/offer/get/all', tokenHandler, jobOfferController.getAllOffers);
offerRouter.get('/offer/get/:offerId', tokenHandler, jobOfferController.getJobOfferById);

export default offerRouter;