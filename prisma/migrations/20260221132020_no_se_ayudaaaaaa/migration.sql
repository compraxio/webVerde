/*
  Warnings:

  - The `año_verificacion` column on the `dir_verde` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "dir_verde" DROP COLUMN "año_verificacion",
ADD COLUMN     "año_verificacion" TIMESTAMP(3),
ALTER COLUMN "autorizado_por" SET DATA TYPE TEXT;
