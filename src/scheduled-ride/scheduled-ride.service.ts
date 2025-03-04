import { Injectable } from '@nestjs/common';
import { CreateScheduledRideDto } from './dto/create-scheduled-ride.dto';
import { UpdateScheduledRideDto } from './dto/update-scheduled-ride.dto';
import { ScheduledRideRepository } from './scheduled-ride.repository';

@Injectable()
export class ScheduledRideService {
  constructor(private readonly scheduledRideRepository: ScheduledRideRepository) {}

  create(createScheduledRideDto: CreateScheduledRideDto) {
    return this.scheduledRideRepository.create(createScheduledRideDto);
  }

  findAll() {
    return this.scheduledRideRepository.findAll();
  }

  findOne(id: string) {
    return this.scheduledRideRepository.findOne(id);
  }

  update(id: string, updateScheduledRideDto: UpdateScheduledRideDto) {
    return this.scheduledRideRepository.update(id, updateScheduledRideDto);
  }

  remove(id: string) {
    return this.scheduledRideRepository.remove(id);
  }
}