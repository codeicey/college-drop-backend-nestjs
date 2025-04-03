import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRideRequestDto } from './dto/create-ride-request.dto';
import { RideStatus } from '@prisma/client';

@Injectable()
export class RideRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    // passengerId: string, 
    createRideRequestDto: CreateRideRequestDto) {
    return this.prisma.rideRequest.create({
      data: {
        // passengerId,
        ...createRideRequestDto,
      },
    });
  }

  async findAll() {
    return this.prisma.rideRequest.findMany();
  }

  async findById(id: string) {
    return this.prisma.rideRequest.findUnique({ where: { id } });
  }

  async acceptRide(driverId: string, rideRequestId: string, pickupLat: string, pickupLong: string, dropoffLat: string, dropoffLong: string, fare: number) {
    const rideRequest = await this.prisma.rideRequest.findUnique({
      where: { id: rideRequestId },
      include: { passenger: true }, // Include passenger details
    });

    if (!rideRequest || rideRequest.status !== RideStatus.PENDING) {
      throw new Error('Ride request not found or already accepted.');
    }

    const passengerId = rideRequest.passengerId;

    // Create a new Ride entry
    const ride = await this.prisma.ride.create({
      data: {
        driver: { connect: { id: driverId } }, // Use connect for relations
        passenger: { connect: { id: passengerId } }, // Use connect for relations
       
        pickupLat: pickupLat || "0.0",
        pickupLong: pickupLong || "0.0",
        dropoffLat: dropoffLat || "0.0",
        dropoffLong: dropoffLong || "0.0",
    
        // startTime: startTime ? new Date(startTime) : null,
        // endTime: endTime ? new Date(endTime) : null,

        fare: fare,
        status: "ACCEPTED",
      },
    });
    

    // Update the rideRequest status
    await this.prisma.rideRequest.update({
      where: { id: rideRequestId },
      data: { status: RideStatus.ACCEPTED },
    });

    return ride;
  }
}
