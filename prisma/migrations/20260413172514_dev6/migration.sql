/*
  Warnings:

  - You are about to drop the column `author` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Photo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoUrl]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoUrl` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "author",
DROP COLUMN "url",
ADD COLUMN     "authorName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "authorUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Photo_photoUrl_key" ON "Photo"("photoUrl");
