export interface DeveloperProfile {

    id: string;

    address: DeveloperProfileAddress;
    about: DeveloperProfileAbout;
    contact: DeveloperProfileContact;

    stack: DeveloperProfileStackList[];
    projects: DeveloperProfileProjects[];
    languages: DeveloperProfileLanguages[];
    certificates: DeveloperProfileCertificates[];
    academic_education: DeveloperProfileAcademicEducation[];
    professional_experiences: DeveloperProfileJobExperiences[];

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileAddress {

    cep: string;
    city: string;
    state: string;
    number: string;
    address: string;
    complement: string;
    neighborhood: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileAbout {

    age: string;
    name: string;
    resume: string;
    picture: string;
    occupation: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileContact {

    phone: string;
    email: string;
    github: string;
    linkedin: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileAcademicEducation {

    id: string;

    type: string;
    course: string;
    status: string;
    modality: string;
    institution: string;

    to: string;
    from: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileJobExperiences {

    id: string;

    company: string;
    current_job: boolean;
    occupation: string;
    resume: string;

    to: string;
    from: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileCertificates {

    id: string;

    link: string;
    course: string;
    workload: string;
    institution: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileProjects {

    id: string;

    link: string;
    title: string;
    resume: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileLanguages {

    id: string;

    level: string;
    language: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileStackList {

    id: string;

    name: string;
    workload: string;

    createdAt: string;
    updatedAt: string;
}

export type CreateNewDeveloperProfileData = Omit<DeveloperProfile, 'id' | 'updatedAt' | 'createdAt'>;

export interface CreateDeveloperAccountRequest {

    stack: Omit<DeveloperProfileStackList, 'id'>;
    projects: Omit<DeveloperProfileProjects, 'id'>;
    languages: Omit<DeveloperProfileLanguages, 'id'>;
    certificates: Omit<DeveloperProfileCertificates, 'id'>;
    academic_education: Omit<DeveloperProfileAcademicEducation, 'id'>;
    professional_experiences: Omit<DeveloperProfileJobExperiences, 'id'>;

    password: { password: string };
    about: Omit<DeveloperProfileAbout, 'id' | 'updatedAt' | 'createdAt'>;
    address: Omit<DeveloperProfileAddress, 'id' | 'updatedAt' | 'createdAt'>;
    contact: Omit<DeveloperProfileContact, 'id' | 'updatedAt' | 'createdAt'>;
}