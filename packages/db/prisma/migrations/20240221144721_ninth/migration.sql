/*
  Warnings:

  - You are about to drop the column `adminId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `adminSession` table. All the data in the column will be lost.
  - Added the required column `userId` to the `adminSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adminSession" DROP CONSTRAINT "adminSession_adminId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "adminId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "adminSession" DROP COLUMN "adminId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "adminSession" ADD CONSTRAINT "adminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
