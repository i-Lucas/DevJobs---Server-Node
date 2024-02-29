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

    id?: string;

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

    id?: string;

    age: string;
    name: string;
    resume: string;
    occupation: string;
    picture: string;

    createdAt: string;
    updatedAt: string;
}

export interface DeveloperProfileContact {

    id?: string;

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

    stack: Omit<DeveloperProfileStackList, 'id'>[];
    projects: Omit<DeveloperProfileProjects, 'id'>[];
    languages: Omit<DeveloperProfileLanguages, 'id'>[];
    certificates: Omit<DeveloperProfileCertificates, 'id'>[];
    academic_education: Omit<DeveloperProfileAcademicEducation, 'id'>[];
    professional_experiences: Omit<DeveloperProfileJobExperiences, 'id'>[];

    password: { password: string };
    about: Omit<DeveloperProfileAbout, 'id' | 'updatedAt' | 'createdAt'>;
    address: Omit<DeveloperProfileAddress, 'id' | 'updatedAt' | 'createdAt'>;
    contact: Omit<DeveloperProfileContact, 'id' | 'updatedAt' | 'createdAt'>;
}

export interface CreateNewAcademicEducation {
    data: Omit<DeveloperProfileAcademicEducation, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

export interface CreateNewJobExperience {
    data: Omit<DeveloperProfileJobExperiences, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

export interface CreateNewCertificate {
    data: Omit<DeveloperProfileCertificates, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

export interface CreateNewLanguage {
    data: Omit<DeveloperProfileLanguages, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

export interface CreateNewStack {
    data: Omit<DeveloperProfileStackList, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

export interface CreateNewProject {
    data: Omit<DeveloperProfileProjects, 'id' | 'updatedAt' | 'createdAt'> & { profileId: string }
}

type DeveloperProfileEditFieldsIdentifier =
    'DEVELOPER_ABOUT' |
    'DEVELOPER_ADDRESS' |
    'DEVELOPER_CONTACT' |
    'DEVELOPER_PROJECTS' |
    'DEVELOPER_EDUCATION' |
    'DEVELOPER_LANGUAGES' |
    'DEVELOPER_STACKLIST' |
    'DEVELOPER_EXPERIENCES' |
    'DEVELOPER_CERTIFICATES'


export interface Talent {

    id: string;
    name: string;
    about: string;
    picture: string;
    location: string;
    occupation: string;
    stacklist: string[]
    languages: string[]
}

export interface TalentResponse {

    count: number;
    talents: Talent[];
}