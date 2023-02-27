/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "images" ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "level" VARCHAR(10) NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "users_imageId_key" ON "users"("imageId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
