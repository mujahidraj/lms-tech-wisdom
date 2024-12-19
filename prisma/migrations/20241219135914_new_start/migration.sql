-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "enrollment_status" TEXT
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "enrollment" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_username_key" ON "student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "course_id_key" ON "course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_id_key" ON "enrollment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "review_id_key" ON "review"("id");

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
