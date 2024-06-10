-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "additional_phone_number" TEXT,
    "description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
