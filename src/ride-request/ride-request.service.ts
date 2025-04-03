import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { RideRequestRepository } from './ride-request.repository';
import { CreateRideRequestDto } from './dto/create-ride-request.dto';
// import { UpdateRideRequestDto } from './dto/update-ride-request.dto';
import { Role, RideStatus } from '@prisma/client';

@Injectable()
export class RideRequestService {
  constructor(private readonly rideRequestRepository: RideRequestRepository) {}

  async create(
    // userRole: Role, 
    // userId: string, 
    // kycVerified: boolean, 
    createRideRequestDto: CreateRideRequestDto) {
    // if (!kycVerified) {
    //   throw new ForbiddenException('Only KYC verified users can request rides.');
    // }
    // if (userRole !== Role.PASSENGER) {
    //   throw new ForbiddenException('Only passengers can request rides.');
    // }
    return this.rideRequestRepository.create(
      // userId,
       createRideRequestDto);
  }

  async findAll() {
    return this.rideRequestRepository.findAll();
  }

  async acceptRide(userRole: Role, userId: string, rideRequestId: string, pickupLat: string, pickupLong: string, dropoffLat: string, dropoffLong: string, fare: number, kycVerified: boolean) {
    if (!kycVerified) {
      throw new ForbiddenException('Only KYC verified users can accept rides.');
    }
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can accept rides.');
    }

    const rideRequest = await this.rideRequestRepository.findById(rideRequestId);
    if (!rideRequest || rideRequest.status !== RideStatus.PENDING) {
      throw new NotFoundException('Ride request not found or already accepted.');
    }

    return this.rideRequestRepository.acceptRide(userId, rideRequestId,pickupLat, pickupLong, dropoffLat, dropoffLong ,fare);
  }
}
