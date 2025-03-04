import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';

@Module({
  controllers: [DriverController],
  providers: [DriverService, PrismaService, DriverRepository],
  exports: [DriverService],
})
export class DriverModule {}
