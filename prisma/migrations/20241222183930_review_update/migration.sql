/*
  Warnings:

  - You are about to drop the column `student_id` on the `review` table. All the data in the column will be lost.
  - Added the required column `comment_by` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reply` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reply_by` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_student_id_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "student_id",
ADD COLUMN     "comment_by" INTEGER NOT NULL,
ADD COLUMN     "reply" TEXT NOT NULL,
ADD COLUMN     "reply_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_reply_by_fkey" FOREIGN KEY ("reply_by") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
