/*
  Warnings:

  - Changed the type of `tipoPodcast` on the `Lead` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `interesse` on the `Lead` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "tipoPodcast",
ADD COLUMN     "tipoPodcast" TEXT NOT NULL,
DROP COLUMN "interesse",
ADD COLUMN     "interesse" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Interesse";

-- DropEnum
DROP TYPE "TipoPodcast";
