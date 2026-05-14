/*
  Warnings:

  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '123';
