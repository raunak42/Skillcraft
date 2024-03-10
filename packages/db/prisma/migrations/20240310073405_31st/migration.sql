/*
  Warnings:

  - You are about to drop the column `adminId` on the `AdminSession` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AdminSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdminSession" DROP CONSTRAINT "AdminSession_adminId_fkey";

-- AlterTable
ALTER TABLE "AdminSession" DROP COLUMN "adminId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
