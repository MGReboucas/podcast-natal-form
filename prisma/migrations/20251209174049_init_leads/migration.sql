-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "tipoPodcast" TEXT NOT NULL,
    "temLogo" TEXT NOT NULL,
    "interesse" TEXT NOT NULL,
    "horas" TEXT,
    "vezesMes" TEXT,
    "horasSessao" TEXT,
    "horario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
