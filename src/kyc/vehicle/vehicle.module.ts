import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository, PrismaService],
})
export class VehicleModule {}
