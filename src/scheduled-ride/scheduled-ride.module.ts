import { Module } from '@nestjs/common';
import { ScheduledRideController } from './scheduled-ride.controller';
import { ScheduledRideService } from './scheduled-ride.service';
import { ScheduledRideRepository } from './scheduled-ride.repository';

@Module({
  controllers: [ScheduledRideController],
  providers: [ScheduledRideService, ScheduledRideRepository],
})
export class ScheduledRideModule {}