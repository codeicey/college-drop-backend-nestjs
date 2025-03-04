import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassengerRepository } from './passenger.repository';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  async create(userRole: Role, createPassengerDto: CreatePassengerDto) {
    if (userRole !== Role.PASSENGER) {
      throw new ForbiddenException('Only passengers can create passenger details.');
    }
    return this.passengerRepository.create(createPassengerDto);
  }

  async update(userRole: Role, passengerId: string, updatePassengerDto: UpdatePassengerDto) {
    if (userRole !== Role.PASSENGER) {
      throw new ForbiddenException('Only passengers can update their details.');
    }
    return this.passengerRepository.update(passengerId, updatePassengerDto);
  }

  async delete(userRole: Role, passengerId: string) {
    if (userRole !== Role.PASSENGER) {
      throw new ForbiddenException('Only passengers can delete their details.');
    }
    return this.passengerRepository.delete(passengerId);
  }
}
