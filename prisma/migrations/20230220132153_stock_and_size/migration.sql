/*
  Warnings:

  - You are about to drop the column `amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Product_Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product_Tag" DROP CONSTRAINT "Product_Tag_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product_Tag" DROP CONSTRAINT "Product_Tag_tagId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "amount";

-- DropTable
DROP TABLE "Product_Tag";

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "type" VARCHAR(10) NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productTags" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "productTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productTags" ADD CONSTRAINT "productTags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productTags" ADD CONSTRAINT "productTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
