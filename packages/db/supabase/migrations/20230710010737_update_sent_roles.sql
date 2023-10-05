/*
  Warnings:

  - Added the required column `updatedAt` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Companies` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Roles` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `SentRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Subscribers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `startedWorkingAt` to the `Subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_sentRolesId_fkey";

-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "sentRolesId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SentRoles" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subscribers" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "startedWorkingAt",
ADD COLUMN     "startedWorkingAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_sentRolesId_fkey" FOREIGN KEY ("sentRolesId") REFERENCES "SentRoles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
