import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

@Injectable()
export class PassengerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPassengerDto: CreatePassengerDto) {
    return this.prisma.passengerDetails.create({
      data: createPassengerDto,
    });
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    return this.prisma.passengerDetails.update({
      where: { id },
      data: updatePassengerDto,
    });
  }

  async delete(id: string) {
    return this.prisma.passengerDetails.delete({ where: { id } });
  }
}
