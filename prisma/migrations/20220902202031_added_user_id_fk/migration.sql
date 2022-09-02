/*
  Warnings:

  - Added the required column `userId` to the `Defendant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Defendant" ADD COLUMN     "userId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Defendant" ADD CONSTRAINT "Defendant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
