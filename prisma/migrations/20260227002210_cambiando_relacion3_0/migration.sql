/*
  Warnings:

  - Added the required column `id_negocio` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "id_negocio" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "productos_id_negocio_idx" ON "productos"("id_negocio");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_id_negocio_fkey" FOREIGN KEY ("id_negocio") REFERENCES "dir_verde"("id_negocio") ON DELETE CASCADE ON UPDATE CASCADE;
