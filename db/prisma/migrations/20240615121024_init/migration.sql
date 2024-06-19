-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "chatCredit" INTEGER NOT NULL,
    "musicCredit" INTEGER NOT NULL,
    "imageCredit" INTEGER NOT NULL,
    "CodeCredit" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
