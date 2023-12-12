export interface CompanyProfileAddress {

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

export interface CompanyProfileOwnerInfo {

    id: string;
    name: string;
    email: string;
    phone: string;

    createdAt: string;
    updatedAt: string;
}

export interface CompanyProfileDetails {

    cnpj: string;
    about: string;
    teamSize: string;
    foundedIn: string;
    marketArea: string;
    description: string;
    legalNature: string;
    socialReason: string;
    fantasy_name: string;

    createdAt: string;
    updatedAt: string;
}

export interface CompanyProfileSupport {

    phone: string;
    rhEmail: string;
    whatsapp: string;
    supportEmail: string;

    createdAt: string;
    updatedAt: string;
}

export interface CompanyProfileSocial {

    github: string;
    banner: string;
    website: string;
    picture: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;

    createdAt: string;
    updatedAt: string;
}

export interface CompanyProfile {

    id: string;

    address: CompanyProfileAddress;
    details: CompanyProfileDetails;
    suportInfo: CompanyProfileSupport;
    ownerInfo: CompanyProfileOwnerInfo;
    socialNetwork: CompanyProfileSocial;

    createdAt: string;
    updatedAt: string;
}

export type NewCompanyProfile = CreateCompanyAccountRequest & { userId: string }

interface CompanyAccountRequest {

    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface CreateCompanyAccountRequest {

    account: CompanyAccountRequest
    social: Omit<CompanyProfileSocial, 'id' | 'updatedAt' | 'createdAt'>;
    suport: Omit<CompanyProfileSupport, 'id' | 'updatedAt' | 'createdAt'>;
    details: Omit<CompanyProfileDetails, 'id' | 'updatedAt' | 'createdAt'>;
    address: Omit<CompanyProfileAddress, 'id' | 'updatedAt' | 'createdAt'>;
}