/*
  Warnings:

  - A unique constraint covering the columns `[course_id]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "review_course_id_key" ON "review"("course_id");
