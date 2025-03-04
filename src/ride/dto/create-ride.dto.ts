// ride/dtos/create-ride.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRideDto {
  @IsString()
  driverId: string;

  @IsString()
  passengerId: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsNumber()
  fare: number;
}
