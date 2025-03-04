import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PassengerRepository } from './passenger.repository';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService, PassengerRepository, PrismaService],
})
export class PassengerModule {}
