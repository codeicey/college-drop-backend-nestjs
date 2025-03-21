import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateKycDto } from './dto/create-kyc.dto';

@Injectable()
export class KycRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKycDto: CreateKycDto) {
    const { userId } = createKycDto;

    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if KYC already exists for the user
    const existingKyc = await this.prisma.kYCVerification.findUnique({
      where: { userId },
    });

    if (existingKyc) {
      throw new ConflictException('User already has a KYC record');
    }

    return this.prisma.kYCVerification.create({
      data: {
        userId,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.kYCVerification.findUnique({
      where: { userId },
      include: { driverDetails: true, passengerDetails: true },
    });
  }
}
