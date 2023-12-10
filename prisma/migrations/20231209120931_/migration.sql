-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ADMIN', 'COMPANY', 'CANDIDATE');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "AccountUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfileAddressModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfileAddressModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfileOwnerInfoModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfileOwnerInfoModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfileDetailsModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "foundedIn" TEXT NOT NULL,
    "marketArea" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "legalNature" TEXT NOT NULL,
    "socialReason" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfileDetailsModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfileSupportInfoModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "rhEmail" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfileSupportInfoModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfileSocialNetworkModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CompanyProfileSocialNetworkModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfile" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileContactModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileContactModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileAboutModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileAboutModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileAddressModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileAddressModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileAcademicEducationModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileAcademicEducationModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileJobExperiencesModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "current_job" BOOLEAN NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileJobExperiencesModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileCertificatesModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "workload" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileCertificatesModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileProjectsModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileProjectsModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileLanguagesModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileLanguagesModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfileStackListModel" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workload" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "CandidateProfileStackListModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUsers_userId_key" ON "AccountUsers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUsers_userId_accountId_key" ON "AccountUsers"("userId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_profileId_key" ON "Account"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileAddressModel_profileId_key" ON "CompanyProfileAddressModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileOwnerInfoModel_profileId_key" ON "CompanyProfileOwnerInfoModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileDetailsModel_profileId_key" ON "CompanyProfileDetailsModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileSupportInfoModel_profileId_key" ON "CompanyProfileSupportInfoModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfileSocialNetworkModel_profileId_key" ON "CompanyProfileSocialNetworkModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfileContactModel_profileId_key" ON "CandidateProfileContactModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfileAboutModel_profileId_key" ON "CandidateProfileAboutModel"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfileAddressModel_profileId_key" ON "CandidateProfileAddressModel"("profileId");

-- AddForeignKey
ALTER TABLE "AccountUsers" ADD CONSTRAINT "AccountUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountUsers" ADD CONSTRAINT "AccountUsers_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfileAddressModel" ADD CONSTRAINT "CompanyProfileAddressModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfileOwnerInfoModel" ADD CONSTRAINT "CompanyProfileOwnerInfoModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfileDetailsModel" ADD CONSTRAINT "CompanyProfileDetailsModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfileSupportInfoModel" ADD CONSTRAINT "CompanyProfileSupportInfoModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProfileSocialNetworkModel" ADD CONSTRAINT "CompanyProfileSocialNetworkModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileContactModel" ADD CONSTRAINT "CandidateProfileContactModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileAboutModel" ADD CONSTRAINT "CandidateProfileAboutModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileAddressModel" ADD CONSTRAINT "CandidateProfileAddressModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileAcademicEducationModel" ADD CONSTRAINT "CandidateProfileAcademicEducationModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileJobExperiencesModel" ADD CONSTRAINT "CandidateProfileJobExperiencesModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileCertificatesModel" ADD CONSTRAINT "CandidateProfileCertificatesModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileProjectsModel" ADD CONSTRAINT "CandidateProfileProjectsModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileLanguagesModel" ADD CONSTRAINT "CandidateProfileLanguagesModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateProfileStackListModel" ADD CONSTRAINT "CandidateProfileStackListModel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
