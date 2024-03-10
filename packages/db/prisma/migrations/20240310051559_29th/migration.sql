/*
  Warnings:

  - You are about to drop the `OAuthAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OAuthAccount" DROP CONSTRAINT "OAuthAccount_user_id_fkey";

-- DropTable
DROP TABLE "OAuthAccount";

-- CreateTable
CREATE TABLE "UserOAuthAccount" (
    "providerId" TEXT NOT NULL,
    "providerUserId" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserOAuthAccount_pkey" PRIMARY KEY ("providerId","providerUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOAuthAccount_providerUserId_key" ON "UserOAuthAccount"("providerUserId");

-- AddForeignKey
ALTER TABLE "UserOAuthAccount" ADD CONSTRAINT "UserOAuthAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
