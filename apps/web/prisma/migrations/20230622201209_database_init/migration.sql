-- CreateTable
CREATE TABLE "Inscritos" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "Inscritos_pkey" PRIMARY KEY ("id")
);
