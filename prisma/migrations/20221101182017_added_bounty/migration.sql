/*
  Warnings:

  - You are about to alter the column `id` on the `Defendant` table. The data in that column will be cast from `Uuid` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- CreateTable
CREATE TABLE "Bounty" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "defendantId" UUID NOT NULL,
    "rewardAmount" INT4 NOT NULL,
    "caseNumber" STRING NOT NULL,
    "lastKnownLocation" STRING NOT NULL,
    "note" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- RedefineTables
CREATE TABLE "_prisma_new_Defendant" (
    "id" STRING NOT NULL,
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "dob" STRING NOT NULL,
    "height" INT4 NOT NULL,
    "weight" INT4 NOT NULL,
    "gender" STRING NOT NULL,
    "race" STRING NOT NULL,
    "reason" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" STRING NOT NULL,

    CONSTRAINT "Defendant_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Defendant" ("createdAt","dob","first_name","gender","height","id","last_name","race","reason","userId","weight") SELECT "createdAt","dob","first_name","gender","height","id","last_name","race","reason","userId","weight" FROM "Defendant";
DROP TABLE "Defendant" CASCADE;
ALTER TABLE "_prisma_new_Defendant" RENAME TO "Defendant";
ALTER TABLE "Defendant" ADD CONSTRAINT "Defendant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
