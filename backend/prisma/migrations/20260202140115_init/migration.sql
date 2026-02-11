-- CreateEnum
CREATE TYPE "TerritoryType" AS ENUM ('NORMAL', 'RURAL', 'BLOCKS');

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "idRole" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublisherAvailability" (
    "id" SERIAL NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "PublisherAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSystem" (
    "id" TEXT NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "UserSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutingAvailability" (
    "id" SERIAL NOT NULL,
    "outingPlaceId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "OutingAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutingPlace" (
    "id" SERIAL NOT NULL,
    "familyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "OutingPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutingTerritory" (
    "id" SERIAL NOT NULL,
    "territoryId" INTEGER NOT NULL,
    "outingPlaceId" INTEGER NOT NULL,

    CONSTRAINT "OutingTerritory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Territory" (
    "id" SERIAL NOT NULL,
    "territoryNumber" INTEGER NOT NULL,
    "mapColor" TEXT NOT NULL,
    "territoryType" "TerritoryType" NOT NULL,

    CONSTRAINT "Territory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "territoryId" INTEGER NOT NULL,
    "badge" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockRecord" (
    "id" SERIAL NOT NULL,
    "blockId" INTEGER NOT NULL,
    "territoryRecordId" INTEGER NOT NULL,

    CONSTRAINT "BlockRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TerritoryRecord" (
    "id" SERIAL NOT NULL,
    "territoryId" INTEGER NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "outingPlaceId" INTEGER NOT NULL,
    "comment" TEXT,
    "dateAssigned" TIMESTAMP(3) NOT NULL,
    "dateWorked" TIMESTAMP(3) NOT NULL,
    "dateCompleted" TIMESTAMP(3),

    CONSTRAINT "TerritoryRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublisherAvailability_publisherId_idx" ON "PublisherAvailability"("publisherId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSystem_publisherId_key" ON "UserSystem"("publisherId");

-- CreateIndex
CREATE INDEX "OutingAvailability_outingPlaceId_idx" ON "OutingAvailability"("outingPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "OutingTerritory_territoryId_outingPlaceId_key" ON "OutingTerritory"("territoryId", "outingPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Territory_territoryNumber_key" ON "Territory"("territoryNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BlockRecord_blockId_territoryRecordId_key" ON "BlockRecord"("blockId", "territoryRecordId");

-- CreateIndex
CREATE INDEX "TerritoryRecord_territoryId_idx" ON "TerritoryRecord"("territoryId");

-- CreateIndex
CREATE INDEX "TerritoryRecord_publisherId_idx" ON "TerritoryRecord"("publisherId");

-- CreateIndex
CREATE INDEX "TerritoryRecord_outingPlaceId_idx" ON "TerritoryRecord"("outingPlaceId");

-- AddForeignKey
ALTER TABLE "Publisher" ADD CONSTRAINT "Publisher_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublisherAvailability" ADD CONSTRAINT "PublisherAvailability_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSystem" ADD CONSTRAINT "UserSystem_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutingAvailability" ADD CONSTRAINT "OutingAvailability_outingPlaceId_fkey" FOREIGN KEY ("outingPlaceId") REFERENCES "OutingPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutingTerritory" ADD CONSTRAINT "OutingTerritory_outingPlaceId_fkey" FOREIGN KEY ("outingPlaceId") REFERENCES "OutingPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutingTerritory" ADD CONSTRAINT "OutingTerritory_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockRecord" ADD CONSTRAINT "BlockRecord_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockRecord" ADD CONSTRAINT "BlockRecord_territoryRecordId_fkey" FOREIGN KEY ("territoryRecordId") REFERENCES "TerritoryRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TerritoryRecord" ADD CONSTRAINT "TerritoryRecord_territoryId_fkey" FOREIGN KEY ("territoryId") REFERENCES "Territory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TerritoryRecord" ADD CONSTRAINT "TerritoryRecord_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TerritoryRecord" ADD CONSTRAINT "TerritoryRecord_outingPlaceId_fkey" FOREIGN KEY ("outingPlaceId") REFERENCES "OutingPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
