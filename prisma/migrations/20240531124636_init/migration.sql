/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Priducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Priducts";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "priducts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "priducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");
