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
			return await updateAbout(data as DeveloperProfileAbout);

		case 'DEVELOPER_STACKLIST':
			return await updateStack(data as DeveloperProfileStackList);

		case 'DEVELOPER_CONTACT':
			return await updateContact(data as DeveloperProfileContact);

		case 'DEVELOPER_ADDRESS':
			return await updateAddress(data as DeveloperProfileAddress);

		case 'DEVELOPER_PROJECTS':
			return await updateProject(data as DeveloperProfileProjects);

		case 'DEVELOPER_LANGUAGES':
			return await updateLanguage(data as DeveloperProfileLanguages);

		case 'DEVELOPER_CERTIFICATES':
			return await updateCertificate(data as DeveloperProfileCertificates);

		case 'DEVELOPER_EXPERIENCES':
			return await updateJobExperience(data as DeveloperProfileJobExperiences);

		case 'DEVELOPER_EDUCATION':
			return await updateAcademicEducation(data as DeveloperProfileAcademicEducation);
	}
}

async function updateAbout(data: DeveloperProfileAbout) {

	await developerProfileRepository.update.about(data);
	return getResponse('Dados pessoais atualizados com sucesso !', 200);
}

function getResponse<T>(message: string, status: number, data?: T) {
	return utils.makeResponse({ status, data, message })
}

async function updateAddress(data: DeveloperProfileAddress) {

	const dbData = await developerProfileRepository.update.address(data as DeveloperProfileAddress);
	return getResponse<DeveloperProfileAddress>('Endereço Atualizado com Sucesso !', 200, dbData);
}

async function updateContact(data: DeveloperProfileContact) {

	const dbData = await developerProfileRepository.update.contact(data as DeveloperProfileContact);
	return getResponse<DeveloperProfileContact>('Contato Atualizado com Sucesso !', 200, dbData);
}

async function updateStack(data: DeveloperProfileStackList) {

	const dbData = await developerProfileRepository.update.stack(data as DeveloperProfileStackList);
	return getResponse<DeveloperProfileStackList>('Tecnologia Atualizada com Sucesso !', 200, dbData);
}

async function updateProject(data: DeveloperProfileProjects) {

	const dbData = await developerProfileRepository.update.project(data as DeveloperProfileProjects);
	return getResponse<DeveloperProfileProjects>('Projeto Atualizado com Sucesso !', 200, dbData);
}

async function updateLanguage(data: DeveloperProfileLanguages) {

	const dbData = await developerProfileRepository.update.language(data as DeveloperProfileLanguages);
	return getResponse<DeveloperProfileLanguages>('Idioma Atualizado com Sucesso !', 200, dbData);
}

async function updateCertificate(data: DeveloperProfileCertificates) {

	const dbData = await developerProfileRepository.update.certificate(data as DeveloperProfileCertificates);
	return getResponse<DeveloperProfileCertificates>('Certificado Atualizado com Sucesso !', 200, dbData);
}

async function updateJobExperience(data: DeveloperProfileJobExperiences) {

	const dbData = await developerProfileRepository.update.job_experience(data as DeveloperProfileJobExperiences);
	return getResponse<DeveloperProfileJobExperiences>('Experiência Profissional Atualizada com Sucesso !', 200, dbData);
}

async function updateAcademicEducation(data: DeveloperProfileAcademicEducation) {

	const dbData = await developerProfileRepository.update.academic_education(data as DeveloperProfileAcademicEducation);
	return getResponse<DeveloperProfileAcademicEducation>('Formação Acadêmica Atualizada com Sucesso !', 200, dbData);
}

interface DeleteDeveloperProfileField {
	id: string;
	identifier: DeveloperProfileEditFieldsIdentifier
}

async function deleteDeveloperProfileField({ id, identifier }: DeleteDeveloperProfileField): Promise<ApiResponse<any>> {

	switch (identifier) {

		case 'DEVELOPER_STACKLIST':
			return await deleteStack(id);

		case 'DEVELOPER_PROJECTS':
			return await deleteProject(id);

		case 'DEVELOPER_LANGUAGES':
			return await deleteLanguage(id);

		case 'DEVELOPER_CERTIFICATES':
			return await deleteCertificate(id);

		case 'DEVELOPER_EXPERIENCES':
			return await deleteJobExperience(id)

		case 'DEVELOPER_EDUCATION':
			return await deleteAcademicEducation(id)
	}
}

async function deleteLanguage(id: string) {

	await developerProfileRepository.delete.language(id);
	return getResponse<any>('Idioma Deletado com Sucesso !', 200);
}

async function deleteProject(id: string) {

	await developerProfileRepository.delete.project(id);
	return getResponse<any>('Projeto Deletado com Sucesso !', 200);
}

async function deleteStack(id: string) {

	await developerProfileRepository.delete.stack(id);
	return getResponse<any>('Tecnologia Deletada com Sucesso !', 200);
}

async function deleteCertificate(id: string) {

	await developerProfileRepository.delete.certificate(id);
	return getResponse<any>('Certificado Deletado com Sucesso !', 200);
}

async function deleteAcademicEducation(id: string) {

	await developerProfileRepository.delete.academic_education(id);
	return getResponse<any>('Formação Acadêmica Deletada com Sucesso !', 200);
}

async function deleteJobExperience(id: string) {

	await developerProfileRepository.delete.job_experience(id);
	return getResponse<any>('Experiência Profissional Deletada com Sucesso !', 200);
}

const developerProfileService = {

	getDeveloperProfile,
	updateDeveloperProfile,
	deleteDeveloperProfileField
}

export default developerProfileService;