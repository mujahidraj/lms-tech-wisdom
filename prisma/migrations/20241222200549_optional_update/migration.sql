-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_reply_by_fkey";

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "reply" DROP NOT NULL,
ALTER COLUMN "reply_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_reply_by_fkey" FOREIGN KEY ("reply_by") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
