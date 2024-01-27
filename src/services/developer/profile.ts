import utils from '../../utils/appUtils.js';
import { ApiResponse } from '../../models/api.js';
import { apiErrors, appMessageErros } from '../../errors/index.js';

import developerProfileRepository from '../../repositories/profile/developer/index.js';

import {

	DeveloperProfile,
	DeveloperProfileAbout,
	DeveloperProfileContact,
	DeveloperProfileAddress,
	DeveloperProfileProjects,
	DeveloperProfileStackList,
	DeveloperProfileLanguages,
	DeveloperProfileCertificates,
	DeveloperProfileJobExperiences,
	DeveloperProfileAcademicEducation,
	DeveloperProfileEditFieldsIdentifier,

} from "../../models/profile/candidate.profile.js";

async function getDeveloperProfile(profileId: string): Promise<DeveloperProfile> {

	const profile = await developerProfileRepository.get.profile(profileId);

	if (!profile) {
		apiErrors.NotFound(appMessageErros.profile.notFound)
	};

	return {

		id: profile.id,
		createdAt: profile.createdAt,
		updatedAt: profile.updatedAt,
		about: profile.CandidateProfileAboutModel,
		address: profile.CandidateProfileAddressModel,
		contact: profile.CandidateProfileContactModel,
		stack: profile.CandidateProfileStackListModel,
		projects: profile.CandidateProfileProjectsModel,
		languages: profile.CandidateProfileLanguagesModel,
		certificates: profile.CandidateProfileCertificatesModel,
		academic_education: profile.CandidateProfileAcademicEducationModel,
		professional_experiences: profile.CandidateProfileJobExperiencesModel,
	}
};

// --------------------------------------------------------------------------------------------------------------------------------------

interface UpdateDeveloperProfile {
	data: Object;
	profileId: string;
	identifier: DeveloperProfileEditFieldsIdentifier
}

async function updateDeveloperProfile({ data, identifier, profileId }: UpdateDeveloperProfile): Promise<ApiResponse<any>> {

	const profile = await developerProfileRepository.get.profile(profileId);

	if (!profile) {
		apiErrors.NotFound(appMessageErros.profile.notFound)
	};

	switch (identifier) {

		case 'DEVELOPER_ABOUT':
			await developerProfileRepository.update.about(data as DeveloperProfileAbout);
			return getResponse<null>('Dados pessoais atualizados com sucesso !', 200);

		case 'DEVELOPER_STACKLIST':
			await developerProfileRepository.update.stack(data as DeveloperProfileStackList);
			return getResponse<null>('Tecnologia Atualizada com Sucesso !', 200);

		case 'DEVELOPER_CONTACT':
			await developerProfileRepository.update.contact(data as DeveloperProfileContact);
			return getResponse<null>('Contato atualizado com sucesso !', 200);

		case 'DEVELOPER_ADDRESS':
			await developerProfileRepository.update.address(data as DeveloperProfileAddress);
			return getResponse<null>('Endereço atualizado com sucesso !', 200);

		case 'DEVELOPER_PROJECTS':
			await developerProfileRepository.update.project(data as DeveloperProfileProjects);
			return getResponse<null>('Projeto atualizado com sucesso !', 200);

		case 'DEVELOPER_LANGUAGES':
			await developerProfileRepository.update.language(data as DeveloperProfileLanguages);
			return getResponse<null>('Idioma atualizado com sucesso !', 200);

		case 'DEVELOPER_CERTIFICATES':
			await developerProfileRepository.update.certificate(data as DeveloperProfileCertificates);
			return getResponse<null>('Certificado atualizado com sucesso !', 200);

		case 'DEVELOPER_EXPERIENCES':
			await developerProfileRepository.update.job_experience(data as DeveloperProfileJobExperiences);
			return getResponse<null>('Experiência profissional atualizada com sucesso !', 200);

		case 'DEVELOPER_EDUCATION':
			await developerProfileRepository.update.academic_education(data as DeveloperProfileAcademicEducation);
			return getResponse<null>('Formação acadêmica atualizada com sucesso !', 200);
	}
}

// --------------------------------------------------------------------------------------------------------------------------------------

interface DeleteDeveloperProfileField {
	id: string;
	identifier: DeveloperProfileEditFieldsIdentifier
}

async function deleteDeveloperProfileField({ id, identifier }: DeleteDeveloperProfileField): Promise<ApiResponse<any>> {

	switch (identifier) {

		case 'DEVELOPER_STACKLIST':
			await developerProfileRepository.delete.stack(id);
			return getResponse<any>('Tecnologia deletada com sucesso !', 200);

		case 'DEVELOPER_PROJECTS':
			await developerProfileRepository.delete.project(id);
			return getResponse<any>('Projeto deletado com sucesso !', 200);

		case 'DEVELOPER_LANGUAGES':
			await developerProfileRepository.delete.language(id);
			return getResponse<any>('Idioma deletado com sucesso !', 200);

		case 'DEVELOPER_CERTIFICATES':
			await developerProfileRepository.delete.certificate(id);
			return getResponse<any>('Certificado deletado com sucesso !', 200);

		case 'DEVELOPER_EXPERIENCES':
			await developerProfileRepository.delete.job_experience(id);
			return getResponse<any>('Experiência profissional deletada com sucesso !', 200);

		case 'DEVELOPER_EDUCATION':
			await developerProfileRepository.delete.academic_education(id);
			return getResponse<any>('Formação acadêmica deletada com sucesso !', 200);
	}
}

// --------------------------------------------------------------------------------------------------------------------------------------

interface AddDeveloperProfile {
	data: Object;
	profileId: string;
	identifier: DeveloperProfileEditFieldsIdentifier
}

async function addDeveloperProfileField({ data, identifier, profileId }: AddDeveloperProfile): Promise<ApiResponse<any>> {

	switch (identifier) {

		case 'DEVELOPER_STACKLIST':
			const stack = await developerProfileRepository.create.stack({ data: { ...data as DeveloperProfileStackList, profileId } })
			return getResponse<DeveloperProfileStackList>('Tecnologia salva com sucesso !', 200, stack);

		case 'DEVELOPER_PROJECTS':
			const project = await developerProfileRepository.create.project({ data: { ...data as DeveloperProfileProjects, profileId } })
			return getResponse<DeveloperProfileProjects>('Projeto salvo com sucesso !', 200, project);

		case 'DEVELOPER_LANGUAGES':
			const language = await developerProfileRepository.create.language({ data: { ...data as DeveloperProfileLanguages, profileId } })
			return getResponse<DeveloperProfileLanguages>('Idioma salvo com sucesso !', 200, language);

		case 'DEVELOPER_CERTIFICATES':
			const certificate = await developerProfileRepository.create.certificate({ data: { ...data as DeveloperProfileCertificates, profileId } })
			return getResponse<DeveloperProfileCertificates>('Certificado salvo com sucesso !', 200, certificate);

		case 'DEVELOPER_EXPERIENCES':
			const experience = await developerProfileRepository.create.job_experience({ data: { ...data as DeveloperProfileJobExperiences, profileId } })
			return getResponse<DeveloperProfileJobExperiences>('Experiência Profissional salva com sucesso !', 200, experience);

		case 'DEVELOPER_EDUCATION':
			const education = await developerProfileRepository.create.academic_education({ data: { ...data as DeveloperProfileAcademicEducation, profileId } })
			return getResponse<DeveloperProfileAcademicEducation>('Formação Acadêmica salva com sucesso !', 200, education);
	}
}

// --------------------------------------------------------------------------------------------------------------------------------------

function getResponse<T>(message: string, status: number, data?: T) {
	return utils.makeResponse<T>({ status, data, message })
}

const developerProfileService = {

	getDeveloperProfile,
	updateDeveloperProfile,
	addDeveloperProfileField,
	deleteDeveloperProfileField,
}

export default developerProfileService;