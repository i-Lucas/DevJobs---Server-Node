/*
  Warnings:

  - Changed the type of `type` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modality` on the `UserProfileAcademicEducation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AcademicType" AS ENUM ('Bacharelado', 'Licenciatura', 'Tecnologo', 'Mestrado', 'Doutorado', 'Tecnico', 'PosGraduacao', 'Estagio', 'CursoLivre');

-- CreateEnum
CREATE TYPE "AcademicStatus" AS ENUM ('Cursando', 'Concluido', 'Trancado', 'Abandonado', 'Interrompido');

-- CreateEnum
CREATE TYPE "AcademicModality" AS ENUM ('EducacaoOnline', 'EducacaoADistancia', 'Presencial');

-- AlterTable
ALTER TABLE "UserProfileAcademicEducation" DROP COLUMN "type",
ADD COLUMN     "type" "AcademicType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "AcademicStatus" NOT NULL,
DROP COLUMN "modality",
ADD COLUMN     "modality" "AcademicModality" NOT NULL;
