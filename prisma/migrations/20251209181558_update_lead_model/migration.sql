/*
  Warnings:

  - You are about to alter the column `horas` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `horasSessao` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `temLogo` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `vezesMes` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "tipoPodcast" TEXT NOT NULL,
    "temLogo" BOOLEAN NOT NULL,
    "interesse" TEXT NOT NULL,
    "horas" INTEGER,
    "vezesMes" INTEGER,
    "horasSessao" INTEGER,
    "horario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Lead" ("createdAt", "horario", "horas", "horasSessao", "id", "interesse", "name", "temLogo", "tipoPodcast", "vezesMes", "whatsapp") SELECT "createdAt", "horario", "horas", "horasSessao", "id", "interesse", "name", "temLogo", "tipoPodcast", "vezesMes", "whatsapp" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
