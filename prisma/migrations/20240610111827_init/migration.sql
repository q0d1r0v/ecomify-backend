/*
  Warnings:

  - You are about to drop the column `banner_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `banner` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "banner_id",
ADD COLUMN     "is_banner" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "banner";
