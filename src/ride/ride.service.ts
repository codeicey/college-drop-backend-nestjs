import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RideService {
  private rides = [];

  create(createRideDto: CreateRideDto) {
    const ride = { id: Date.now().toString(), ...createRideDto };
    this.rides.push(ride);
    return ride;
  }

  findAll() {
    return this.rides;
  }

  findOne(id: string) {
    return this.rides.find(ride => ride.id === id);
  }

  update(id: string, updateRideDto: UpdateRideDto) {
    const rideIndex = this.rides.findIndex(ride => ride.id === id);
    if (rideIndex !== -1) {
      this.rides[rideIndex] = { ...this.rides[rideIndex], ...updateRideDto };
      return this.rides[rideIndex];
    }
    return null;
  }

  remove(id: string) {
    this.rides = this.rides.filter(ride => ride.id !== id);
    return { message: 'Ride deleted successfully' };
  }
}
