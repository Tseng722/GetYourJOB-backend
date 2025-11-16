/*
  Warnings:

  - You are about to drop the column `applyed` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `fifthInterview` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `firstInterview` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `fourthInterview` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `inProgress` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `offer` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `rejected` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `secondInterview` on the `Applications` table. All the data in the column will be lost.
  - You are about to drop the column `thirdInterview` on the `Applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Applications" DROP COLUMN "applyed",
DROP COLUMN "fifthInterview",
DROP COLUMN "firstInterview",
DROP COLUMN "fourthInterview",
DROP COLUMN "inProgress",
DROP COLUMN "offer",
DROP COLUMN "rejected",
DROP COLUMN "secondInterview",
DROP COLUMN "thirdInterview",
ADD COLUMN     "applyedDate" TIMESTAMP(3),
ADD COLUMN     "fifthInterviewDate" TIMESTAMP(3),
ADD COLUMN     "firstInterviewDate" TIMESTAMP(3),
ADD COLUMN     "fourthInterviewDate" TIMESTAMP(3),
ADD COLUMN     "inProgressDate" TIMESTAMP(3),
ADD COLUMN     "offerDate" TIMESTAMP(3),
ADD COLUMN     "rejectedDate" TIMESTAMP(3),
ADD COLUMN     "secondInterviewDate" TIMESTAMP(3),
ADD COLUMN     "thirdInterviewDate" TIMESTAMP(3);
