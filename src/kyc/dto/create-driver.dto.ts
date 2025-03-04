import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  kycId: string;

  @IsString()
  licensePhoto: string;

  @IsString()
  vehiclePhoto: string;

  @IsString()
  vehicleType: string;

  @IsString()
  vehiclePlate: string;
}
