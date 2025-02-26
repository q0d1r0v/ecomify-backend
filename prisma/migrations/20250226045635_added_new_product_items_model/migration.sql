/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `residue` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_uz]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_ru]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_ru` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_ru` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_name_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "name_ru" TEXT NOT NULL,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "productItemsId" TEXT;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "productItemsId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "residue",
ADD COLUMN     "description_ru" TEXT,
ADD COLUMN     "description_uz" TEXT,
ADD COLUMN     "name_ru" TEXT NOT NULL,
ADD COLUMN     "name_uz" TEXT NOT NULL,
ALTER COLUMN "stock" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "product_items" (
    "id" TEXT NOT NULL,
    "name_uz" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_uz_key" ON "categories"("name_uz");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_ru_key" ON "categories"("name_ru");

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productItemsId_fkey" FOREIGN KEY ("productItemsId") REFERENCES "product_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productItemsId_fkey" FOREIGN KEY ("productItemsId") REFERENCES "product_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
