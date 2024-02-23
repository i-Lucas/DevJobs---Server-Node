import getHiringProcessPackage from './get.js';
import createHiringProcessPackage from './create.js';
import updateHiringProcessPackage from './update.js';

const hiringRepository = {

    create: {

        process: createHiringProcessPackage.newHiringProcess,

    },

    update: {

        apply: updateHiringProcessPackage.applyNewCandidate,
        subsCount: updateHiringProcessPackage.updateSubscribersCount

    },

    get: {

        byId: getHiringProcessPackage.getHiringProcessById,
        allCompanyProcess: getHiringProcessPackage.getCompanyHiringProcessList,

        offers: {

            offerById: getHiringProcessPackage.getCompanyOfferById,
            allAppOffers: getHiringProcessPackage.getAllAppJobOffers,
            companyJobOffers: getHiringProcessPackage.getCompanyOffersWithoutSteps,
        }
    },

    delete: {


    }
}


export default hiringRepository;