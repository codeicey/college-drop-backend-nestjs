import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async verifyKyc(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { kycVerified: true },
    });
  }
}
