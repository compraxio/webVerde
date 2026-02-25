/*
  Warnings:

  - Made the column `nombre` on table `contactos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `contactos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidad_productiva` on table `dir_verde` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contactos" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "telefono" SET NOT NULL;

-- AlterTable
ALTER TABLE "dir_verde" ALTER COLUMN "unidad_productiva" SET NOT NULL;
