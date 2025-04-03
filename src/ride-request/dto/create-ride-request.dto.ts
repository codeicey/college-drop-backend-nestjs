import { IsString } from 'class-validator';

export class CreateRideRequestDto {
  @IsString()
  passengerId: string;

  @IsString()
  pickupLat: string;

  @IsString()
  pickupLong: string;

  @IsString()
  dropoffLat: string;

  @IsString()
  dropoffLong: string;
}
