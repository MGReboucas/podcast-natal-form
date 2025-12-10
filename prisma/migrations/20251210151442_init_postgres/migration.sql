-- CreateEnum
CREATE TYPE "TipoPodcast" AS ENUM ('SOLO', 'ENTREVISTA', 'BATE_PAPO', 'INDEFINIDO');

-- CreateEnum
CREATE TYPE "Interesse" AS ENUM ('UNICO', 'MENSAL');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "tipoPodcast" "TipoPodcast" NOT NULL,
    "temLogo" BOOLEAN NOT NULL,
    "interesse" "Interesse" NOT NULL,
    "horas" INTEGER,
    "vezesMes" INTEGER,
    "horasSessao" INTEGER,
    "horario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
