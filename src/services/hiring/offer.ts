import { ApiResponse } from '../../models/api.js';

import { JobOfferData } from '../../models/hiring.js';

import { apiErrors, appMessageErros } from '../../errors/index.js';

import hiringRepository from '../../repositories/hiring/index.js';

async function getAllOffers(): Promise<ApiResponse<JobOfferData[]>> {

    const offers = await hiringRepository.get.offers.allAppOffers();

    if (offers.length === 0) {

        return {

            status: 200,
            message: 'Nenhuma vaga de emprego foi encontrada'
        }
    }

    const formatedOffers = getFormattedOffers(offers);

    const response: ApiResponse<JobOfferData[]> = {
        data: formatedOffers,
        status: 200,
        message: 'Vagas encontradas com sucesso !',
    };

    return response;
}

async function getJobOfferById(offerId: string) {

    if (!offerId) {
        apiErrors.BadRequest(appMessageErros.hiring.jobOffer.invalidId);
    }

    const offer = await hiringRepository.get.offers.offerById(offerId);

    if (!offer) {
        apiErrors.NotFound(appMessageErros.hiring.jobOffer.notFound);
    }

    const { city, state } = offer.company.CompanyProfileAddressModel;
    const { picture } = offer.company.CompanyProfileSocialNetworkModel;
    const { fantasy_name: name } = offer.company.CompanyProfileDetailsModel;

    const location = offer.locationType === 'Presencial' ? city.concat(' - ').concat(state) : offer.locationType;

    const data: JobOfferData = {

        company: {
            name,
            picture,
            profile: offer.companyProfileId,
        },
        offer: {
            ...offer,
            location
        }
    };

    const response: ApiResponse<JobOfferData> = {
        data,
        status: 200,
        message: 'Vaga encontrada com sucesso !',
    };

    return response;
}

async function getCompanyJobOffersList(companyProfileId: string): Promise<JobOfferData[]> {

    const companyOffers = await hiringRepository.get.offers.companyJobOffers(companyProfileId);

    if (companyOffers.length === 0) return [];

    const offers = getFormattedOffers(companyOffers);

    return offers;
};

function getFormattedOffers(offers: any[]): JobOfferData[] {

    return offers.map((offer) => {

        const { city, state } = offer.company.CompanyProfileAddressModel;
        const { picture } = offer.company.CompanyProfileSocialNetworkModel;
        const { fantasy_name: name } = offer.company.CompanyProfileDetailsModel;

        delete offer.company;

        const location = offer.locationType === 'Presencial' ? city.concat(' - ').concat(state) : offer.locationType;

        return {

            company: {
                name,
                profile: offer.companyProfileId,
                picture
            },
            offer: {
                ...offer,
                location
            }
        };
    });
}

const jobOfferService = {
    getAllOffers,
    getJobOfferById,
    getCompanyJobOffersList
}

export default jobOfferService;