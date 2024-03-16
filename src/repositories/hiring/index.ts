import getHiringProcessPackage from './get.js';
import createHiringProcessPackage from './create.js';
import updateHiringProcessPackage from './update.js';
import updateDeveloperProfilePackage from '../profile/developer/update.js';

const hiringRepository = {

    create: {

        process: createHiringProcessPackage.newHiringProcess,

        steps: {

            step: createHiringProcessPackage.createProcessStep,
            stepList: createHiringProcessPackage.createProcessStepList,
            fillCandidatesList: createHiringProcessPackage.fillCandidatesList
        }

    },

    update: {

        subsCount: updateHiringProcessPackage.updateSubscribersCount,

        steps: {

            currentStep: updateHiringProcessPackage.updateProcessCurrentStep,

            list: {

                candidateList: updateHiringProcessPackage.updateCandidateList,
            }
        }
    },

    get: {

        byId: getHiringProcessPackage.getHiringProcessById,
        allCompanyProcess: getHiringProcessPackage.getCompanyHiringProcessList,
        companyProcessById: getHiringProcessPackage.getCompanyHiringProcessById,
        rhEmailByRecruiterEmail: getHiringProcessPackage.getCompanyContactEmailByHiringRecruiterEmail,

        steps: {

            currentStep: getHiringProcessPackage.getProcessCurrentStep,
            candidatesList: getHiringProcessPackage.getStepCandidatesLists,
            getStepById: getHiringProcessPackage.getStepById
        },

        offers: {

            offerById: getHiringProcessPackage.getCompanyOfferById,
            allAppOffers: getHiringProcessPackage.getAllAppJobOffers,
            companyJobOffers: getHiringProcessPackage.getCompanyOffersWithoutSteps,
            offersByPagination: getHiringProcessPackage.getAllAppJobOffersByPagination,
        }
    },

    delete: {


    }
}


export default hiringRepository;