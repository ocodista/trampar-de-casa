/*
  Warnings:

  - You are about to drop the `RoleSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleSkills" DROP CONSTRAINT "RoleSkills_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RoleSkills" DROP CONSTRAINT "RoleSkills_skillId_fkey";

-- DropTable
DROP TABLE "RoleSkills";
