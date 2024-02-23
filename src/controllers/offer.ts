import { Request, Response } from 'express';

import { UserJwtPayload } from '../models/user.js';
import jobOfferService from '../services/hiring/offer.js';

async function getJobOfferById(req: Request, res: Response) {

    const { offerId } = req.params;

    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await jobOfferService.getJobOfferById(offerId);

    return res.status(response.status).json(response);
};

async function getAllOffers(req: Request, res: Response) {
    
    // const { userId }: UserJwtPayload = res.locals.user;

    const response = await jobOfferService.getAllOffers();

    return res.status(response.status).json(response);
}

const jobOfferController = {
    getAllOffers,
    getJobOfferById
}

export default jobOfferController;