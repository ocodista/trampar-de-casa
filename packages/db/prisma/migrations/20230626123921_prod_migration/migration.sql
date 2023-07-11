/*
  Warnings:

  - The primary key for the `Subscribers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Subscribers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LinkedInUrl` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartedWorkingAt` to the `Subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnglishLevel" AS ENUM ('Beginner', 'Intermediary', 'Advanced', 'Fluent');

-- DropIndex
DROP INDEX "Subscribers_email_key";

-- AlterTable
ALTER TABLE "Subscribers" DROP CONSTRAINT "Subscribers_pkey",
DROP COLUMN "created_at",
DROP COLUMN "email",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "EnglishLevel" "EnglishLevel",
ADD COLUMN     "GitHub" TEXT,
ADD COLUMN     "LinkedInUrl" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Skills" JSONB,
ADD COLUMN     "StartedWorkingAt" INTEGER NOT NULL,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subscribers_id_seq";

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "CompanyId" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Language" TEXT NOT NULL,
    "Currency" TEXT,
    "Salary" TEXT,
    "CreatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "SentRolesId" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentRoles" (
    "id" TEXT NOT NULL,
    "SentAt" TIMESTAMP(3),
    "RoleId" TEXT NOT NULL,

    CONSTRAINT "SentRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Url" TEXT NOT NULL,
    "LogoUrl" TEXT,
    "CountryIcon" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SentRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_SentRolesId_key" ON "Roles"("SentRolesId");

-- CreateIndex
CREATE INDEX "SentRoles_SentAt_idx" ON "SentRoles"("SentAt");

-- CreateIndex
CREATE UNIQUE INDEX "_SentRoles_AB_unique" ON "_SentRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_SentRoles_B_index" ON "_SentRoles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_Email_key" ON "Subscribers"("Email");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_SentRolesId_fkey" FOREIGN KEY ("SentRolesId") REFERENCES "SentRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SentRoles" ADD CONSTRAINT "_SentRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "SentRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SentRoles" ADD CONSTRAINT "_SentRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
