-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_locationId_fkey";

-- AlterTable
ALTER TABLE "Recommendation" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
