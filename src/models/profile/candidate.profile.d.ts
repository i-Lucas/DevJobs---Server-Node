export interface CandidateProfile {

    id: string;

    about: CandidateProfileAbout;
    contact: CandidateProfileContact;
    
    academic_education: CandidateProfileAcademicEducation[];
    professional_experiences: CandidateProfileJobExperiences[];
    certificates: CandidateProfileCertificates[];
    languages: CandidateProfileLanguages[];
    projects: CandidateProfileProjects[];
    stack: CandidateProfileStackList[];

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileAbout {

    name: string;
    age: string;
    occupation: string;
    resume: string;
}

export interface CandidateProfileContact {

    address: string;
    phone: string;
    github: string;
    linkedin: string;
    email: string;
}

export interface CandidateProfileAcademicEducation {

    id: string;

    course: string;
    institution: string;
    modality: string;
    status: string;
    type: string;

    from: string;
    to: string;

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileJobExperiences {

    id: string;

    company: string;
    current_job: boolean;
    occupation: string;
    resume: string;

    from: string;
    to: string;

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileCertificates {

    id: string;

    course: string;
    institution: string;
    workload: string;
    link: string;

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileProjects {

    id: string;

    resume: string;
    title: string;
    link: string;

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileLanguages {

    id: string;

    language: string;
    level: string;

    createdAt: string;
    updatedAt: string;
}

export interface CandidateProfileStackList {

    id: string;

    name: string;
    workload: string;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewCandidateProfileData = Omit<CandidateProfile, 'id' | 'updatedAt' | 'createdAt'>;