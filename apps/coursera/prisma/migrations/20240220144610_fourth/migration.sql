/*
  Warnings:

  - A unique constraint covering the columns `[github_id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `github_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "github_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_github_id_key" ON "Admin"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
