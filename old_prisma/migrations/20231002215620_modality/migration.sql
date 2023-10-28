/*
  Warnings:

  - Added the required column `modality` to the `UserProfileAcademicEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfileAcademicEducation" ADD COLUMN     "modality" TEXT NOT NULL;
