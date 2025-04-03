import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RideRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  private rides = [];

  async create(dto: CreateRideDto){
    return this.prisma.ride.create({ 
      data : {
        driverId: String(dto.driverId), // Ensure explicit casting
        passengerId: String(dto.passengerId),
        startTime: dto.startTime ? new Date(dto.startTime) : undefined, // Convert to Date if applicable
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
        pickupLat: dto.pickupLat ?? null,
        pickupLong: dto.pickupLong ?? null,
        dropoffLat: dto.dropoffLat ?? null,
        dropoffLong: dto.dropoffLong ?? null,
        fare: dto.fare,
      },

     });
  } 

  // create(ride) {
  //   this.rides.push(ride);
  //   return ride;
  // }

  findAll() {
    return this.rides;
  }

  findOne(id: string) {
    return this.rides.find(ride => ride.id === id);
  }

  update(id: string, rideData) {
    const index = this.rides.findIndex(ride => ride.id === id);
    if (index !== -1) {
      this.rides[index] = { ...this.rides[index], ...rideData };
      return this.rides[index];
    }
    return null;
  }

  remove(id: string) {
    this.rides = this.rides.filter(ride => ride.id !== id);
    return { message: 'Ride deleted successfully' };
  }
}