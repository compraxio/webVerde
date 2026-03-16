/*
  Warnings:

  - You are about to drop the column `whatsup` on the `dir_verde` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telefono,id_negocio]` on the table `contactos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_negocio` to the `contactos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "contactos_correo_key";

-- DropIndex
DROP INDEX "contactos_telefono_key";

-- AlterTable
ALTER TABLE "contactos" ADD COLUMN     "id_negocio" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "dir_verde" DROP COLUMN "whatsup";

-- CreateIndex
CREATE INDEX "contactos_id_negocio_idx" ON "contactos"("id_negocio");

-- CreateIndex
CREATE UNIQUE INDEX "contactos_telefono_id_negocio_key" ON "contactos"("telefono", "id_negocio");

-- AddForeignKey
ALTER TABLE "contactos" ADD CONSTRAINT "contactos_id_negocio_fkey" FOREIGN KEY ("id_negocio") REFERENCES "dir_verde"("id_negocio") ON DELETE CASCADE ON UPDATE CASCADE;
