/*
  Warnings:

  - You are about to drop the `criterios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dir_verde_vs_criterios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dir_verde_vs_criterios" DROP CONSTRAINT "dir_verde_vs_criterios_id_criterio_fkey";

-- DropForeignKey
ALTER TABLE "dir_verde_vs_criterios" DROP CONSTRAINT "dir_verde_vs_criterios_id_negocio_fkey";

-- DropTable
DROP TABLE "criterios";

-- DropTable
DROP TABLE "dir_verde_vs_criterios";

-- DropTable
DROP TABLE "estados";

-- DropTable
DROP TABLE "videos";
