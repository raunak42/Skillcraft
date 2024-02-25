/*
  Warnings:

  - You are about to drop the column `github_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_github_id_key";

-- DropIndex
DROP INDEX "User_github_id_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "github_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_id";

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "providerId" INTEGER NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("providerId","providerUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_providerUserId_key" ON "OAuthAccount"("providerUserId");

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
