/*
  Warnings:

  - You are about to drop the column `username` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminname]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminname` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_username_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "username",
ADD COLUMN     "adminname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminname_key" ON "Admin"("adminname");
