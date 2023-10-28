export interface CandidateProfile {

    id: string;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewCandidateProfileData = Omit<CandidateProfile, 'id' | 'updatedAt' | 'createdAt'>;