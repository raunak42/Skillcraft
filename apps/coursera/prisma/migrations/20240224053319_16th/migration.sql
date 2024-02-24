-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "hashed_password" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashed_password" TEXT NOT NULL DEFAULT '';
