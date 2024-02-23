/*
  Warnings:

  - The primary key for the `OAuthAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OAuthAccount" DROP CONSTRAINT "OAuthAccount_pkey",
ALTER COLUMN "providerUserId" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("providerId", "providerUserId");
