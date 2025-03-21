import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { KycRepository } from './kyc.repository';
import { CreateKycDto } from './dto/create-kyc.dto';
import { Role } from '@prisma/client';

@Injectable()
export class KycService {
  constructor(private readonly kycRepository: KycRepository) {}

  async createKyc(
    // userRole: Role,
     createKycDto: CreateKycDto) {
    // if (userRole !== Role.ADMIN) {
    //   throw new ForbiddenException('Only admins can create KYC records.');
    // }
    return this.kycRepository.create(createKycDto);
  }

  async getKycByUser(userId: string) {
    const kyc = await this.kycRepository.findByUserId(userId);
    if (!kyc) {
      throw new NotFoundException('KYC record not found.');
    }
    return kyc;
  }
}
