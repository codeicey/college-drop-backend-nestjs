/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `endLocation` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `startLocation` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the `DriverSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RidePassenger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fare` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengerId` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'UPI', 'CASH');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "DriverSchedule" DROP CONSTRAINT "DriverSchedule_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "RidePassenger" DROP CONSTRAINT "RidePassenger_rideId_fkey";

-- DropForeignKey
ALTER TABLE "RidePassenger" DROP CONSTRAINT "RidePassenger_user_fkey";

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "createdAt",
DROP COLUMN "endLocation",
DROP COLUMN "price",
DROP COLUMN "scheduleId",
DROP COLUMN "startLocation",
DROP COLUMN "updatedAt",
ADD COLUMN     "fare" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "passengerId" TEXT NOT NULL,
ADD COLUMN     "route" TEXT,
ADD COLUMN     "status" "RideStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "startTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0.0;

-- DropTable
DROP TABLE "DriverSchedule";

-- DropTable
DROP TABLE "RidePassenger";

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRequest" (
    "id" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "RideStatus" NOT NULL DEFAULT 'PENDING',
    "rideId" TEXT,

    CONSTRAINT "RideRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledRide" (
    "id" TEXT NOT NULL,
    "postedById" TEXT NOT NULL,
    "isDriverPosting" BOOLEAN NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "route" TEXT,
    "fare" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "dateRange" TEXT NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "ScheduledRide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "rideId" TEXT,
    "scheduledRideId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserJoinedScheduledRides" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserJoinedScheduledRides_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "RideRequest_rideId_key" ON "RideRequest"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_rideId_key" ON "Payment"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_scheduledRideId_key" ON "Payment"("scheduledRideId");

-- CreateIndex
CREATE INDEX "_UserJoinedScheduledRides_B_index" ON "_UserJoinedScheduledRides"("B");

-- RenameForeignKey
ALTER TABLE "KYCVerification" RENAME CONSTRAINT "KYCVerification_user_fkey" TO "KYCVerification_userId_fkey";

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequest" ADD CONSTRAINT "RideRequest_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequest" ADD CONSTRAINT "RideRequest_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledRide" ADD CONSTRAINT "ScheduledRide_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_scheduledRideId_fkey" FOREIGN KEY ("scheduledRideId") REFERENCES "ScheduledRide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserJoinedScheduledRides" ADD CONSTRAINT "_UserJoinedScheduledRides_A_fkey" FOREIGN KEY ("A") REFERENCES "ScheduledRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserJoinedScheduledRides" ADD CONSTRAINT "_UserJoinedScheduledRides_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
