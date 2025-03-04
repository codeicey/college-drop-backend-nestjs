import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { RideRepository } from './ride.repository';

@Module({
  controllers: [RideController],
  providers: [RideService, RideRepository, PrismaService],
})
export class RideModule {}
