-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_imgUrl_key" ON "images"("imgUrl");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
