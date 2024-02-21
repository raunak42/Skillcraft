-- CreateTable
CREATE TABLE "userSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminSession" (
    "id" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userSession" ADD CONSTRAINT "userSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminSession" ADD CONSTRAINT "adminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
