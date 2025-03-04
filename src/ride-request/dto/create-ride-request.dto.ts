import { IsString } from 'class-validator';

export class CreateRideRequestDto {
  @IsString()
  pickupLocation: string;

  @IsString()
  dropoffLocation: string;
}
