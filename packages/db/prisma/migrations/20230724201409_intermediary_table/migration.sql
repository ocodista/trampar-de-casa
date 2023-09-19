/*
  Warnings:

  - You are about to drop the column `skills` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Subscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "skills",
ADD COLUMN     "skillsId" TEXT[];

-- AlterTable
ALTER TABLE "Subscribers" DROP COLUMN "skills",
ALTER COLUMN "id" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Skills" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleSkills" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "RoleSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribersSkills" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "subscriberId" UUID NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "SubscribersSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoleSkills" ADD CONSTRAINT "RoleSkills_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleSkills" ADD CONSTRAINT "RoleSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribersSkills" ADD CONSTRAINT "SubscribersSkills_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribersSkills" ADD CONSTRAINT "SubscribersSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
