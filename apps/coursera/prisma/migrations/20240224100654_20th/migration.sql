-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "hashed_password" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashed_password" SET DEFAULT '';
