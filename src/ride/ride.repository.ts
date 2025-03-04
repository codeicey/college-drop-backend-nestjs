import { Injectable } from '@nestjs/common';

@Injectable()
export class RideRepository {
  private rides = [];

  create(ride) {
    this.rides.push(ride);
    return ride;
  }

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