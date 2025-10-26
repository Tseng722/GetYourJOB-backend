-- CreateEnum
CREATE TYPE "Status" AS ENUM ('inProgress', 'applyed', 'firstInterview', 'secondInterview', 'thirdInterview', 'fourthInterview', 'fifthInterview', 'offer', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "visa" TEXT,
    "linkedIn" TEXT,
    "github" TEXT,
    "experience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" SERIAL NOT NULL,
    "companyTitle" TEXT,
    "jobTitle" TEXT NOT NULL,
    "status" "Status",
    "resourceId" TEXT,
    "applyById" TEXT,
    "website" TEXT,
    "howManyApplicant" INTEGER,
    "jobDescription" TEXT,
    "coverLetter" TEXT,
    "qusetion" TEXT,
    "analyzedJDResponse" TEXT,
    "atsScoreResponse" INTEGER,
    "atsDescriptionResponse" TEXT,
    "resumeSuggestionResponse" TEXT,
    "inProgress" TIMESTAMP(3),
    "applyed" TIMESTAMP(3),
    "firstInterview" TIMESTAMP(3),
    "secondInterview" TIMESTAMP(3),
    "thirdInterview" TIMESTAMP(3),
    "fourthInterview" TIMESTAMP(3),
    "fifthInterview" TIMESTAMP(3),
    "offer" TIMESTAMP(3),
    "rejected" TIMESTAMP(3),
    "applicationDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
