/*
  Warnings:

  - Changed the type of `type` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modality` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserProfileAcademicEducation" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "modality",
ADD COLUMN     "modality" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AcademicModality";

-- DropEnum
DROP TYPE "AcademicStatus";

-- DropEnum
DROP TYPE "AcademicType";
