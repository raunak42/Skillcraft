/*
  Warnings:

  - The primary key for the `OAuthAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `providerUserId` on the `OAuthAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OAuthAccount" DROP CONSTRAINT "OAuthAccount_pkey",
DROP COLUMN "providerUserId",
ADD COLUMN     "providerUserId" INTEGER NOT NULL,
ADD CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("providerId", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_providerUserId_key" ON "OAuthAccount"("providerUserId");
