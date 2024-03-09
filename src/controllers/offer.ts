import { Request, Response } from 'express';

// import { UserJwtPayload } from '../models/user.js';
import jobOfferService from '../services/hiring/offer.js';

async function getJobOfferById(req: Request, res: Response) {

    const { offerId } = req.params;

    // await new Promise((resolve) => setTimeout(resolve, 2300));

    const response = await jobOfferService.getJobOfferById(offerId);

    return res.status(response.status).json(response);
};

async function getAllOffers(req: Request, res: Response) {

    // const { userId }: UserJwtPayload = res.locals.user;

    // await new Promise((resolve) => setTimeout(resolve, 850));

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const startIndex = (page - 1) * pageSize;

    const response = await jobOfferService.getAllOffersByPagination(startIndex, pageSize);

    return res.status(response.status).json(response);
}

const jobOfferController = {
    getAllOffers,
    getJobOfferById
}

export default jobOfferController;