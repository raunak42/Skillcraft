/*
  Warnings:

  - You are about to drop the `adminSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adminSession" DROP CONSTRAINT "adminSession_userId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;

-- DropTable
DROP TABLE "adminSession";

-- CreateTable
CREATE TABLE "AdminOAuthAccount" (
    "providerId" TEXT NOT NULL,
    "providerUserId" DOUBLE PRECISION NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "AdminOAuthAccount_pkey" PRIMARY KEY ("providerId","providerUserId")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminOAuthAccount_providerUserId_key" ON "AdminOAuthAccount"("providerUserId");

-- AddForeignKey
ALTER TABLE "AdminOAuthAccount" ADD CONSTRAINT "AdminOAuthAccount_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
