-- CreateTable
CREATE TABLE "Automovel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Utilizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inicio" DATETIME NOT NULL,
    "fim" DATETIME,
    "motivo" TEXT NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    "automovelId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Utilizacao_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Utilizacao_automovelId_fkey" FOREIGN KEY ("automovelId") REFERENCES "Automovel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Automovel_placa_key" ON "Automovel"("placa");
