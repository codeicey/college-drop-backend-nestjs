import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(driverId: string, createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        driverId,
        ...createVehicleDto,
      },
    });
  }

  async update(driverId: string, vehicleId: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.updateMany({
      where: { id: vehicleId, driverId },
      data: updateVehicleDto,
    });
  }

  async delete(driverId: string, vehicleId: string) {
    return this.prisma.vehicle.deleteMany({
      where: { id: vehicleId, driverId },
    });
  }
}
