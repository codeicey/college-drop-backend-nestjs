import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

@Injectable()
export class PassengerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPassengerDto: CreatePassengerDto) {
    const { kycId, studentId, passengerPhoto } = createPassengerDto;

    // Step 1: Check if the KYC record exists
    const existingKYC = await this.prisma.kYCVerification.findUnique({
      where: { id: kycId },
      include: { passengerDetails: true },
    });

    if (!existingKYC) {
      throw new NotFoundException('KYC record not found for the provided ID.');
    }

    // Step 2: Ensure the user does not already have PassengerDetails
    if (existingKYC.passengerDetails) {
      throw new BadRequestException('User already has PassengerDetails.');
    }

    // Step 3: Create the PassengerDetails entry
    return this.prisma.passengerDetails.create({
      data: {
        kycId,
        studentId,
        passengerPhoto,
      },
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
