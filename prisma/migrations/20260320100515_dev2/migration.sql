-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "timeByCarInSeconds" INTEGER,
ADD COLUMN     "timeByPublicTransportInSeconds" INTEGER;
