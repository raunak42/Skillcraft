/*
  Warnings:

  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "purchasedCourse" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "purchasedCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchasedCourse_userId_courseId_key" ON "purchasedCourse"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "purchasedCourse" ADD CONSTRAINT "purchasedCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasedCourse" ADD CONSTRAINT "purchasedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
