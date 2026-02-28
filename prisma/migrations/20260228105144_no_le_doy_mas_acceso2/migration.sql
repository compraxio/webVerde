/*
  Warnings:

  - The `fecha` column on the `eventos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "fecha",
ADD COLUMN     "fecha" TIMESTAMP(3);
