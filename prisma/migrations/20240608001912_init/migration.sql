-- AlterTable
ALTER TABLE "images" ADD COLUMN     "banner_id" INTEGER;

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banner_name_key" ON "banner"("name");
