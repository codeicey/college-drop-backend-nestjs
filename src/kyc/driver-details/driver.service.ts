import { Injectable, ForbiddenException } from '@nestjs/common';
import { DriverRepository } from './driver.repository';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { Role } from '@prisma/client';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async create(
    // userRole: Role, 
    createDriverDto: CreateDriverDto) {
    // if (userRole !== Role.DRIVER) {
    //   throw new ForbiddenException('Only drivers can create driver details.');
    // }
    return this.driverRepository.create(createDriverDto);
  }

  async update(userRole: Role, driverId: string, updateDriverDto: UpdateDriverDto) {
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can update their details.');
    }
    return this.driverRepository.update(driverId, updateDriverDto);
  }

  async delete(userRole: Role, driverId: string) {
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can delete their details.');
    }
    return this.driverRepository.delete(driverId);
  }
}
