/*
  Warnings:

  - Made the column `nombre` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_prodcto` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precio` on table `productos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "img_prodcto" SET NOT NULL,
ALTER COLUMN "precio" SET NOT NULL;
