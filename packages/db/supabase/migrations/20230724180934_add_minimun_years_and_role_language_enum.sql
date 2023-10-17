/*
  Warnings:

  - The `minimunYears` column on the `Roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `language` on the `Roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleLanguage" AS ENUM ('English', 'Portuguese');

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "language",
ADD COLUMN     "language" "RoleLanguage" NOT NULL,
DROP COLUMN "minimunYears",
ADD COLUMN     "minimunYears" INTEGER;
