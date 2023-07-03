/*
  Warnings:

  - You are about to drop the column `CountryIcon` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `LogoUrl` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Url` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyId` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Currency` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Language` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Salary` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `SentRolesId` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `RoleId` on the `SentRoles` table. All the data in the column will be lost.
  - You are about to drop the column `SentAt` on the `SentRoles` table. All the data in the column will be lost.
  - The primary key for the `Subscribers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `EnglishLevel` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `GitHub` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `LinkedInUrl` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `Skills` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `StartedWorkingAt` on the `Subscribers` table. All the data in the column will be lost.
  - The `id` column on the `Subscribers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[sentRolesId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryIcon` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentRolesId` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `SentRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `B` on the `_SentRoles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_CompanyId_fkey";

-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_SentRolesId_fkey";

-- DropForeignKey
ALTER TABLE "_SentRoles" DROP CONSTRAINT "_SentRoles_B_fkey";

-- DropIndex
DROP INDEX "Roles_SentRolesId_key";

-- DropIndex
DROP INDEX "SentRoles_SentAt_idx";

-- DropIndex
DROP INDEX "Subscribers_Email_key";

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "CountryIcon",
DROP COLUMN "CreatedAt",
DROP COLUMN "LogoUrl",
DROP COLUMN "Name",
DROP COLUMN "Url",
ADD COLUMN     "countryIcon" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "CompanyId",
DROP COLUMN "Country",
DROP COLUMN "CreatedAt",
DROP COLUMN "Currency",
DROP COLUMN "Description",
DROP COLUMN "Language",
DROP COLUMN "Salary",
DROP COLUMN "SentRolesId",
DROP COLUMN "Title",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "sentRolesId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SentRoles" DROP COLUMN "RoleId",
DROP COLUMN "SentAt",
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "sentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Subscribers" DROP CONSTRAINT "Subscribers_pkey",
DROP COLUMN "CreatedAt",
DROP COLUMN "Email",
DROP COLUMN "EnglishLevel",
DROP COLUMN "GitHub",
DROP COLUMN "LinkedInUrl",
DROP COLUMN "Name",
DROP COLUMN "Skills",
DROP COLUMN "StartedWorkingAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "englishLevel" "EnglishLevel",
ADD COLUMN     "gitHub" TEXT,
ADD COLUMN     "linkedInUrl" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "skills" JSONB,
ADD COLUMN     "startedWorkingAt" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_SentRoles" DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_sentRolesId_key" ON "Roles"("sentRolesId");

-- CreateIndex
CREATE INDEX "SentRoles_sentAt_idx" ON "SentRoles"("sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SentRoles_AB_unique" ON "_SentRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_SentRoles_B_index" ON "_SentRoles"("B");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_sentRolesId_fkey" FOREIGN KEY ("sentRolesId") REFERENCES "SentRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SentRoles" ADD CONSTRAINT "_SentRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
