/*
  Warnings:

  - The `autorizado_por` column on the `dir_verde` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "dir_verde" DROP COLUMN "autorizado_por",
ADD COLUMN     "autorizado_por" TIMESTAMP(3);
