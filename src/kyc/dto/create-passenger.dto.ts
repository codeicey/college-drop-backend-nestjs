import { IsString, IsOptional } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  kycId: string;

  @IsString()
  passengerPhoto: string;

  @IsOptional()
  @IsString()
  studentId?: string;
}
