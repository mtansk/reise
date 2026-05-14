/*
  Warnings:

  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "city",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '123';
