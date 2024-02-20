import db from '../../config/db.js';
import { HiringProcess } from '../../models/hiring.js';

async function getHiringProcessById(processId: string) {

    return await db.hiringProcess.findUnique({
        where: {
            id: processId
        },
        include: {
            steps: {
                include: {
                    candidatesLists: {
                        include: {
                            candidates: true
                        }
                    }
                }
            }
        }
    })
}

async function getCompanyHiringProcessListByAccountId(accountId: string): Promise<HiringProcess[]> {

    return await db.hiringProcess.findMany({
        where: {
            accountId
        },
        include: {
            steps: {
                include: {
                    candidatesLists: {
                        include: {
                            candidates: true
                        }
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
}

const getHiringProcessPackage = {
    getHiringProcessById,
    getCompanyHiringProcessListByAccountId,
}

export default getHiringProcessPackage;