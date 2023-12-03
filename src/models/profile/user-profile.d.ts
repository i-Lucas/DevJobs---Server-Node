// type UUID = string;

// export interface UserCurriculumProfile {

//     id: UUID,
//     userId: UUID,

//     header_profile?: UserProfileHeader;
//     professional_experiences?: UserProfileJobExperiences[];
//     academic_education?: UserProfileAcademicEducation[];
//     certificates?: UserProfileCertificates[];
//     projects?: UserProfileProjects[];
//     languages: UserProfileLanguages[];
//     stack?: UserProfileStack[];
// }

// interface UserProfileHeader {

//     id: UUID,
//     profileId: UUID, // remover essa porra

//     profile_name: string;
//     profile_job_title: string;
//     profile_img: string;
//     profile_resume: string;
//     profile_location: string;
//     profile_phone: string;
//     profile_git_link: string;
//     profile_linkedin_link: string;
//     profile_gmail_link: string;
// }

// interface UserProfileAcademicEducation {
//     id: UUID;
//     profileId: UUID;
//     institution: string;
//     course: string;
//     type: string;
//     status: string;
//     modality: string;
//     from: Date;
//     to: Date;
// }

// export interface UserProfileJobExperiences {

//     id: UUID,
//     profileId: UUID,

//     company_name: string;
//     occupation: string;
//     from: Date;
//     to: Date;
//     resume: string;
//     current_job: boolean;
// }

// interface UserProfileCertificates {

//     id: UUID,
//     profileId: UUID,

//     institution: string;
//     course: string;
//     link?: string;
// }

// interface UserProfileProjects {

//     id: UUID,
//     profileId: UUID,

//     title: string;
//     resume: string;
//     link?: string;
// }

// interface UserProfileLanguages {

//     id: UUID,
//     profileId: UUID,

//     language: string;
//     level: string;
// }

// interface UserProfileStack {

//     id: UUID,
//     profileId: UUID,

//     name: string;
// }