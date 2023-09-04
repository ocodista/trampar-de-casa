/*
  Warnings:

  - You are about to drop the column `name` on the `RoleSkills` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SubscribersSkills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoleSkills" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "SubscribersSkills" DROP COLUMN "name";
