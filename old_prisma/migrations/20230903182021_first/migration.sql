-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCurriculumProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCurriculumProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileHeader" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "profile_name" TEXT,
    "profile_job_title" TEXT,
    "profile_img" TEXT,
    "profile_resume" TEXT NOT NULL,
    "profile_location" TEXT NOT NULL,
    "profile_phone" TEXT NOT NULL,
    "profile_git_link" TEXT NOT NULL,
    "profile_linkedin_link" TEXT NOT NULL,
    "profile_gmail_link" TEXT NOT NULL,

    CONSTRAINT "UserProfileHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileAcademicEducation" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfileAcademicEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileJobExperiences" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "resume" TEXT NOT NULL,
    "current_job" BOOLEAN NOT NULL,

    CONSTRAINT "UserProfileJobExperiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileCertificates" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "UserProfileCertificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileProjects" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "UserProfileProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileLanguages" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "UserProfileLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileStack" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserProfileStack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCurriculumProfile_userId_key" ON "UserCurriculumProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfileHeader_profileId_key" ON "UserProfileHeader"("profileId");

-- AddForeignKey
ALTER TABLE "UserCurriculumProfile" ADD CONSTRAINT "UserCurriculumProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileHeader" ADD CONSTRAINT "UserProfileHeader_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileAcademicEducation" ADD CONSTRAINT "UserProfileAcademicEducation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileJobExperiences" ADD CONSTRAINT "UserProfileJobExperiences_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileCertificates" ADD CONSTRAINT "UserProfileCertificates_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileProjects" ADD CONSTRAINT "UserProfileProjects_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileLanguages" ADD CONSTRAINT "UserProfileLanguages_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileStack" ADD CONSTRAINT "UserProfileStack_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserCurriculumProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
