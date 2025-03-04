import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';

@Injectable()
export class DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    return this.prisma.driverDetails.create({
      data: createDriverDto,
    });
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.prisma.driverDetails.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  async delete(id: string) {
    return this.prisma.driverDetails.delete({ where: { id } });
  }
}
