/*
  Warnings:

  - You are about to drop the `_descriptionTopics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `descriptionTopics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_descriptionTopics" DROP CONSTRAINT "_descriptionTopics_A_fkey";

-- DropForeignKey
ALTER TABLE "_descriptionTopics" DROP CONSTRAINT "_descriptionTopics_B_fkey";

-- DropTable
DROP TABLE "_descriptionTopics";

-- DropTable
DROP TABLE "descriptionTopics";

-- CreateTable
CREATE TABLE "SubscriberTopics" (
    "id" SERIAL NOT NULL,
    "subscriberId" UUID NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "SubscriberTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topics_name_key" ON "Topics"("name");

-- AddForeignKey
ALTER TABLE "SubscriberTopics" ADD CONSTRAINT "SubscriberTopics_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriberTopics" ADD CONSTRAINT "SubscriberTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
