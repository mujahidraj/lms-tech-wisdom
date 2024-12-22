/*
  Warnings:

  - The `enrollment_status` column on the `student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "enrollment_status",
ADD COLUMN     "enrollment_status" BOOLEAN NOT NULL DEFAULT false;
