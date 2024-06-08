/*
  Warnings:

  - You are about to drop the `priducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "priducts";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name_uz" TEXT NOT NULL,
    "name_ru" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description_uz" TEXT NOT NULL,
    "description_ru" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
