import db from '../../config/db.js';
import { HiringProcess } from '../../models/hiring.js';

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
    getCompanyHiringProcessListByAccountId
}

export default getHiringProcessPackage;