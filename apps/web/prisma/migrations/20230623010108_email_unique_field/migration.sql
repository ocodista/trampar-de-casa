/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");
