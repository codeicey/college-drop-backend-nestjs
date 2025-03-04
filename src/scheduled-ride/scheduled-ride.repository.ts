import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduledRideRepository {
  private scheduledRides = [];

  create(scheduledRide) {
    this.scheduledRides.push(scheduledRide);
    return scheduledRide;
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