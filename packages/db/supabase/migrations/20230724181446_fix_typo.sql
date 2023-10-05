/*
  Warnings:

  - You are about to drop the column `minimunYears` on the `Roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "minimunYears",
ADD COLUMN     "minimumYears" INTEGER;
