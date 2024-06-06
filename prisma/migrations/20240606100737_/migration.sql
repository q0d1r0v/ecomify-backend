/*
  Warnings:

  - You are about to drop the column `title` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `priducts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `priducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_uz]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_ru]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_ru` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_ru` to the `priducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_uz` to the `priducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_ru` to the `priducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `priducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_title_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "title",
ADD COLUMN     "name_ru" TEXT NOT NULL,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "priducts" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "description_ru" TEXT NOT NULL,
ADD COLUMN     "description_uz" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT NOT NULL,
ADD COLUMN     "name_uz" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_uz_key" ON "categories"("name_uz");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_ru_key" ON "categories"("name_ru");
