import db from '../../config/db.js'
import utils from "../../utils/appUtils.js";
import appConfig from '../../config/app.js';

import {
	NewCompanyProfile,
	CompanyProfileSocial,
	CompanyProfileSupport,
	CompanyProfileAddress,
	CompanyProfileDetails,
} from "../../models/profile/company.profile.js";

async function updateContact(
	data: Omit<CompanyProfileSupport, 'createdAt' | 'updatedAt'>):
	Promise<CompanyProfileSupport> {

	const now = utils.now();

	return await db.companyProfileSupportInfoModel.update({
		where: {
			id: data.id
		},
		data: {
			...data,
			updatedAt: now
		}
	})
}

async function updateAddress(
	data: Omit<CompanyProfileAddress, 'createdAt' | 'updatedAt'>):
	Promise<CompanyProfileAddress> {

	const now = utils.now();

	return await db.companyProfileAddressModel.update({
		where: {
			id: data.id
		},
		data: {
			...data,
			updatedAt: now
		}
	})
}

async function updateDetails(
	data: Omit<CompanyProfileDetails, 'createdAt' | 'updatedAt'>):
	Promise<CompanyProfileDetails> {

	const now = utils.now();

	return await db.companyProfileDetailsModel.update({
		where: {
			id: data.id
		},
		data: {
			...data,
			updatedAt: now
		}
	})
}

async function updateSocial(
	data: Omit<CompanyProfileSocial, 'createdAt' | 'updatedAt'>):
	Promise<CompanyProfileSocial> {

	const now = utils.now();

	return await db.companyProfileSocialNetworkModel.update({
		where: {
			id: data.id
		},
		data: {
			...data,
			updatedAt: now
		}
	})
}

async function createCompanyProfile(profile: NewCompanyProfile) {

	const createdAtAndUpdatedAt = utils.createdAtAndUpdatedAtNow();

	return await db.companyProfile.create({

		data: {

			...createdAtAndUpdatedAt,

			CompanyProfileAddressModel: {
				create: {
					...profile.address,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileDetailsModel: {
				create: {
					...profile.details,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileOwnerInfoModel: {
				create: {
					userId: profile.userId,
					email: profile.account.email,
					name: profile.account.name,
					phone: profile.account.phone,
					...createdAtAndUpdatedAt,
				}
			},

			CompanyProfileSocialNetworkModel: {
				create: {
					...profile.social,
					...createdAtAndUpdatedAt,
					banner: appConfig.client.company.default_banner,
					picture: appConfig.client.company.default_picture,
				}
			},

			CompanyProfileSupportInfoModel: {
				create: {
					...profile.suport,
					...createdAtAndUpdatedAt,
				}
			}
		}
	})
}

async function getCompanyProfile(profileId: string) {

	return await db.companyProfile.findUnique({

		where: {
			id: profileId
		},

		include: {
			CompanyProfileAddressModel: true,
			CompanyProfileDetailsModel: true,
			CompanyProfileOwnerInfoModel: true,
			CompanyProfileSocialNetworkModel: true,
			CompanyProfileSupportInfoModel: true
		},
	});
};

const companyProfileRepository = {
	updateSocial,
	updateContact,
	updateAddress,
	updateDetails,
	createCompanyProfile,
	getCompanyProfile
}

export default companyProfileRepository;