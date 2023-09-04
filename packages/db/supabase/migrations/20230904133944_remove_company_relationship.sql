/*
  Warnings:

  - You are about to drop the column `companyId` on the `Roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_companyId_fkey";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "companyId";
