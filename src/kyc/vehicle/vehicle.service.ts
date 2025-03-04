import { Injectable, ForbiddenException } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Role } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async create(userRole: Role, userId: string, createVehicleDto: CreateVehicleDto) {
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can add a vehicle.');
    }
    return this.vehicleRepository.create(userId, createVehicleDto);
  }

  async update(userRole: Role, userId: string, vehicleId: string, updateVehicleDto: UpdateVehicleDto) {
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can update their vehicle details.');
    }
    return this.vehicleRepository.update(userId, vehicleId, updateVehicleDto);
  }

  async delete(userRole: Role, userId: string, vehicleId: string) {
    if (userRole !== Role.DRIVER) {
      throw new ForbiddenException('Only drivers can delete their vehicle.');
    }
    return this.vehicleRepository.delete(userId, vehicleId);
  }
}
