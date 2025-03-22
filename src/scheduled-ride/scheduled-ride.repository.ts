import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScheduledRideDto } from './dto/create-scheduled-ride.dto';

@Injectable()
export class ScheduledRideRepository {
  constructor(private readonly prisma: PrismaService) {}
  private scheduledRides = [];

  async create(dto: CreateScheduledRideDto) {
    return this.prisma.scheduledRide.create({
      data: {
        postedById: dto.postedById, // Use DTO to pass this value
        isDriverPosting: dto.isDriverPosting,
        startTime: dto.startTime ? new Date(dto.startTime) : null,
        endTime: dto.endTime ? new Date(dto.endTime) : null,
        route: dto.route,
        fare: dto.fare,
        location: dto.location,
        availableSeats: dto.availableSeats,
        dateRange: dto.dateRange,
        status: 'OPEN', // Default status if not provided
      },
    });
  }

  findAll() {
    return this.scheduledRides;
  }

  findOne(id: string) {
    return this.scheduledRides.find(ride => ride.id === id);
  }

  update(id: string, updateData) {
    const index = this.scheduledRides.findIndex(ride => ride.id === id);
    if (index !== -1) {
      this.scheduledRides[index] = { ...this.scheduledRides[index], ...updateData };
      return this.scheduledRides[index];
    }
    return null;
  }

  remove(id: string) {
    this.scheduledRides = this.scheduledRides.filter(ride => ride.id !== id);
    return { message: 'Scheduled Ride deleted successfully' };
  }
}