export interface CompanyProfile {

    id: string;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewCompanyProfileData = Omit<CompanyProfile, 'id' | 'updatedAt' | 'createdAt'>;