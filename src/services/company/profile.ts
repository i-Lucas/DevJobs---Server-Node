import { apiErrors, appMessageErros } from "../../errors/index.js";

import { CompanyProfile } from "../../models/profile/company.profile.js";
import companyProfileRepository from "../../repositories/profile/company.js";

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

const companyProfileService = {
	getCompanyProfile
};

export default companyProfileService;