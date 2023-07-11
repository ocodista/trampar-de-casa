/*
  Warnings:

  - You are about to drop the `Inscritos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Inscritos";

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);
