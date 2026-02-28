/*
  Warnings:

  - You are about to drop the column `municipio` on the `dir_verde` table. All the data in the column will be lost.
  - You are about to drop the column `zona` on the `dir_verde` table. All the data in the column will be lost.
  - Added the required column `id_municipio` to the `dir_verde` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dir_verde" DROP COLUMN "municipio",
DROP COLUMN "zona",
ADD COLUMN     "id_municipio" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "dir_verde_id_municipio_idx" ON "dir_verde"("id_municipio");

-- AddForeignKey
ALTER TABLE "dir_verde" ADD CONSTRAINT "dir_verde_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "municipios"("cod_munic") ON DELETE RESTRICT ON UPDATE CASCADE;
