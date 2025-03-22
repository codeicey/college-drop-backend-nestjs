import { Module } from '@nestjs/common';
import { ScheduledRideController } from './scheduled-ride.controller';
import { ScheduledRideService } from './scheduled-ride.service';
import { ScheduledRideRepository } from './scheduled-ride.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ScheduledRideController],
  providers: [ScheduledRideService, ScheduledRideRepository, PrismaService],
})
export class ScheduledRideModule {}