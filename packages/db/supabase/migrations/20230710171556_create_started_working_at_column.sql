/*
  Warnings:

  - The `startedWorkingAt` column on the `Subscribers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_sentRolesId_fkey";

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "sentRolesId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscribers" DROP COLUMN "startedWorkingAt",
ADD COLUMN     "startedWorkingAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_sentRolesId_fkey" FOREIGN KEY ("sentRolesId") REFERENCES "SentRoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
