/*
  Warnings:

  - Added the required column `horario` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "horario" TEXT NOT NULL;
