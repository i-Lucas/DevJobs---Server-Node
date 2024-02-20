import createHiringProcessPackage from './create.js';
import getHiringProcessPackage from './get.js';

const hiringRepository = {

    create: {

        process: createHiringProcessPackage.newHiringProcess

    },

    update: {


    },

    get: {

        allCompanyProcess: getHiringProcessPackage.getCompanyHiringProcessListByAccountId

    },

    delete: {


    }
}


export default hiringRepository;