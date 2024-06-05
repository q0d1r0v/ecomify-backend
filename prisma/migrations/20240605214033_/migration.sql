/*
  Warnings:

  - You are about to drop the column `procut_id` on the `images` table. All the data in the column will be lost.
  - The `category_id` column on the `images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updated_at` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "procut_id",
ADD COLUMN     "product_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "category_id",
ADD COLUMN     "category_id" INTEGER;
