import { IsString } from 'class-validator';

export class CreateRideRequestDto {
  @IsString()
  passengerId: string;

  @IsString()
  pickupLocation: string;

  @IsString()
  dropoffLocation: string;
}
