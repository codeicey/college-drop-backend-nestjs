import { IsEnum, IsOptional, IsString } from 'class-validator';
import { KYCStatus } from '@prisma/client';

export class CreateKycDto {
  @IsString()
  userId: string;

  @IsEnum(KYCStatus)
  status: KYCStatus;

  @IsOptional()
  @IsString()
  driverDetailsId?: string;

  @IsOptional()
  @IsString()
  passengerDetailsId?: string;
}
