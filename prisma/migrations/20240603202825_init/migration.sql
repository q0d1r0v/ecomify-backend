/*
  Warnings:

  - Added the required column `updated_at` to the `priducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "category_id" TEXT,
ALTER COLUMN "procut_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "priducts" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
