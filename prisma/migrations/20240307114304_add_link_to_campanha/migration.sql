/*
  Warnings:

  - Added the required column `link` to the `Campanha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campanha" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutoriais" ALTER COLUMN "video" DROP NOT NULL,
ALTER COLUMN "video" SET DEFAULT '';
