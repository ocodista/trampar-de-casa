-- CreateTable
CREATE TABLE "descriptionTopics" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "descriptionTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_descriptionTopics" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_descriptionTopics_AB_unique" ON "_descriptionTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_descriptionTopics_B_index" ON "_descriptionTopics"("B");

-- AddForeignKey
ALTER TABLE "_descriptionTopics" ADD CONSTRAINT "_descriptionTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "Subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_descriptionTopics" ADD CONSTRAINT "_descriptionTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "descriptionTopics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
