/*
  Warnings:

  - A unique constraint covering the columns `[territoryId,badge]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[familyName]` on the table `OutingPlace` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Block_territoryId_badge_key" ON "Block"("territoryId", "badge");

-- CreateIndex
CREATE UNIQUE INDEX "OutingPlace_familyName_key" ON "OutingPlace"("familyName");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleName_key" ON "Role"("roleName");
