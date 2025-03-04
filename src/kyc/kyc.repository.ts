import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateKycDto } from './dto/create-kyc.dto';

@Injectable()
export class KycRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKycDto: CreateKycDto) {
    return this.prisma.kYCVerification.create({
      data: createKycDto,
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.kYCVerification.findUnique({
      where: { userId },
      include: { driverDetails: true, passengerDetails: true },
    });
  }
}
