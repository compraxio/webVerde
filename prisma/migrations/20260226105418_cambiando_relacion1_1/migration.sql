/*
  Warnings:

  - You are about to drop the column `correo` on the `dir_verde` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "dir_verde_correo_key";

-- AlterTable
ALTER TABLE "dir_verde" DROP COLUMN "correo";
