/*
  Warnings:

  - Changed the type of `defendantId` on the `Bounty` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bounty" DROP COLUMN "defendantId";
ALTER TABLE "Bounty" ADD COLUMN     "defendantId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_defendantId_fkey" FOREIGN KEY ("defendantId") REFERENCES "Defendant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
