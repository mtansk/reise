/*
  Warnings:

  - You are about to drop the column `description` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `timeByCarInSeconds` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `timeByPublicTransportInSeconds` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "country" SET DEFAULT 'Country',
ALTER COLUMN "name" SET DEFAULT 'City';

-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "description",
DROP COLUMN "timeByCarInSeconds",
DROP COLUMN "timeByPublicTransportInSeconds";

-- DropTable
DROP TABLE "Photo";
