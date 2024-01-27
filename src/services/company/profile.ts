import { apiErrors, appMessageErros } from '../../errors/index.js';

import utils from '../../utils/appUtils.js';
import { ApiResponse } from '../../models/api.js';
import companyProfileRepository from '../../repositories/profile/company.js';

import {
	CompanyProfile,
	CompanyProfileSocial,
	CompanyProfileAddress,
	CompanyProfileSupport,
	CompanyProfileDetails,
	CompanyProfileEditFieldsIdentifier,
} from '../../models/profile/company.profile.js';

async function getCompanyProfile(profileId: string): Promise<CompanyProfile> {

	const profile = await companyProfileRepository.getCompanyProfile(profileId);

	if (!profile) {
		apiErrors.NotFound(appMessageErros.profile.notFound)
	};

	return {

		id: profile.id,
		createdAt: profile.createdAt,
		updatedAt: profile.updatedAt,
		address: profile.CompanyProfileAddressModel,
		details: profile.CompanyProfileDetailsModel,
		ownerInfo: profile.CompanyProfileOwnerInfoModel,
		socialNetwork: profile.CompanyProfileSocialNetworkModel,
		suportInfo: profile.CompanyProfileSupportInfoModel
	}
};

interface UpdateCompanyProfile {
	data: Object;
	profileId: string;
	identifier: CompanyProfileEditFieldsIdentifier
}

async function updateCompanyProfile({ data, identifier, profileId }: UpdateCompanyProfile): Promise<ApiResponse<any>> {

	switch (identifier) {

		case 'COMPANY_ADDRESS':
			await companyProfileRepository.updateAddress(data as CompanyProfileAddress);
			return getResponse<null>('Endereço atualizado com sucesso !', 200);

		case 'COMPANY_CONTACT':
			await companyProfileRepository.updateContact(data as CompanyProfileSupport);
			return getResponse<null>('Contato atualizado com sucesso !', 200);

		case 'COMPANY_DETAILS':
			await companyProfileRepository.updateDetails(data as CompanyProfileDetails);
			return getResponse<null>('Dados atualizados com sucesso !', 200);

		case 'COMPANY_SOCIAL':
			await companyProfileRepository.updateSocial(data as CompanyProfileSocial);
			return getResponse<null>('Redes sociais atualizadas com sucesso !', 200);

		case 'COMPANY_OWNER':
			break;

		case 'COMPANY_PERMISSIONS':
			break;
	}
}

function getResponse<T>(message: string, status: number, data?: T) {
	return utils.makeResponse<T>({ status, data, message })
}

const companyProfileService = {
	getCompanyProfile,
	updateCompanyProfile
};

export default companyProfileService;