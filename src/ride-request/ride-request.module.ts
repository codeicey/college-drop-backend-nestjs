import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RideRequestController } from './ride-request.controller';
import { RideRequestService } from './ride-request.service';
import { RideRequestRepository } from './ride-request.repository';

@Module({
  controllers: [RideRequestController],
  providers: [RideRequestService, RideRequestRepository, PrismaService],
})
export class RideRequestModule {}
