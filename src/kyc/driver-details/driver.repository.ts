import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';

@Injectable()
export class DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    const { kycId, licensePhoto, vehiclePhoto, vehicleType, vehiclePlate } = createDriverDto;

    // Step 1: Check if the KYC record exists
    const existingKYC = await this.prisma.kYCVerification.findUnique({
      where: { id: kycId },
      include: { driverDetails: true },
    });

    if (!existingKYC) {
      throw new NotFoundException('KYC record not found for the provided ID.');
    }

    // Step 2: Ensure the user does not already have DriverDetails
    if (existingKYC.driverDetails) {
      throw new BadRequestException('User already has DriverDetails.');
    }

    // Step 3: Create the DriverDetails entry
    return this.prisma.driverDetails.create({
      data: {
        kycId,
        licensePhoto,
        vehiclePhoto,
        vehicleType,
        vehiclePlate,
      },
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
