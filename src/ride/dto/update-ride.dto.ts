// ride/dtos/update-ride.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRideDto {
  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsOptional()
  @IsNumber()
  fare?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
