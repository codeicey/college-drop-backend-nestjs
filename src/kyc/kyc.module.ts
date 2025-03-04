import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { PrismaService } from '../prisma.service';
import { KycRepository } from './kyc.repository';

@Module({
  controllers: [KycController],
  providers: [KycService, PrismaService, KycRepository],
  exports: [KycService],
})
export class KycModule {}
