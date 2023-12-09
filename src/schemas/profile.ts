import joi from 'joi';

const developerProfileStackListSchema = joi.object({
    // id: joi.string().required(),
    name: joi.string().required(),
    workload: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileProjectsSchema = joi.object({
    // id: joi.string().required(),
    link: joi.string().required(),
    title: joi.string().required(),
    resume: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileLanguagesSchema = joi.object({
    // id: joi.string().required(),
    level: joi.string().required(),
    language: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileCertificatesSchema = joi.object({
    // id: joi.string().required(),
    link: joi.string().required(),
    course: joi.string().required(),
    workload: joi.string().required(),
    institution: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileAcademicEducationSchema = joi.object({
    // id: joi.string().required(),
    type: joi.string().required(),
    course: joi.string().required(),
    status: joi.string().required(),
    modality: joi.string().required(),
    institution: joi.string().required(),
    to: joi.string().required(),
    from: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileJobExperiencesSchema = joi.object({
    // id: joi.string().required(),
    company: joi.string().required(),
    current_job: joi.boolean().required(),
    occupation: joi.string().required(),
    resume: joi.string().required(),
    to: joi.string().required(),
    from: joi.string().required(),
    createdAt: joi.string().required(),
    updatedAt: joi.string().required(),
});

const developerProfileAboutSchema = joi.object({
    age: joi.string().required(),
    name: joi.string().required(),
    resume: joi.string().required(),
    occupation: joi.string().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const developerProfileContactSchema = joi.object({
    phone: joi.string().required(),
    email: joi.string().email().required(),
    github: joi.string().uri().required(),
    linkedin: joi.string().uri().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const developerProfileAddressSchema = joi.object({
    cep: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    number: joi.string().required(),
    address: joi.string().required(),
    complement: joi.string().required(),
    neighborhood: joi.string().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const developerAccountRequestSchema = joi.object({

    stack: joi.array().items(developerProfileStackListSchema).required(),
    projects: joi.array().items(developerProfileProjectsSchema).required(),
    languages: joi.array().items(developerProfileLanguagesSchema).required(),
    certificates: joi.array().items(developerProfileCertificatesSchema).required(),
    academic_education: joi.array().items(developerProfileAcademicEducationSchema).required(),
    professional_experiences: joi.array().items(developerProfileJobExperiencesSchema).required(),

    password: joi.object({
        password: joi.string().required(),
        confirm: joi.string()
    }).required(),

    about: developerProfileAboutSchema.required(),
    address: developerProfileAddressSchema.required(),
    contact: developerProfileContactSchema.required(),
});

// ------------------------------------------------------------------------------------------------------ company

const companyAccountRequestSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
    password: joi.string().required(),
    confirm: joi.string()
});

const companyProfileSocialSchema = joi.object({
    github: joi.string().uri().required(),
    website: joi.string().uri().required(),
    twitter: joi.string().uri().required(),
    facebook: joi.string().uri().required(),
    linkedin: joi.string().uri().required(),
    instagram: joi.string().uri().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const companyProfileAddressSchema = joi.object({
    cep: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    number: joi.string().required(),
    address: joi.string().required(),
    complement: joi.string().required(),
    neighborhood: joi.string().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const companyProfileDetailsSchema = joi.object({
    cnpj: joi.string().required(),
    about: joi.string().required(),
    teamSize: joi.string().required(),
    foundedIn: joi.string().required(),
    marketArea: joi.string().required(),
    description: joi.string().required(),
    legalNature: joi.string().required(),
    socialReason: joi.string().required(),
    fantasy_name: joi.string().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const companyProfileSupportSchema = joi.object({
    phone: joi.string().required(),
    rhEmail: joi.string().email().required(),
    whatsapp: joi.string().required(),
    supportEmail: joi.string().email().required(),
    // createdAt: joi.string().required(),
    // updatedAt: joi.string().required(),
});

const newCompanyAccountRequestSchema = joi.object({
    account: companyAccountRequestSchema.required(),
    social: companyProfileSocialSchema.required(),
    suport: companyProfileSupportSchema.required(),
    details: companyProfileDetailsSchema.required(),
    address: companyProfileAddressSchema.required(),
});

const profileAccountSchema = {
    companySchema: newCompanyAccountRequestSchema,
    developerSchema: developerAccountRequestSchema
}

export default profileAccountSchema;