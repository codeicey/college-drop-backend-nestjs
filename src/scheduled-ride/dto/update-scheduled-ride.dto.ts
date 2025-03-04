import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateScheduledRideDto {
  @IsOptional()
  @IsBoolean()
  isDriverPosting?: boolean;

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
  location?: string;

  @IsOptional()
  @IsNumber()
  availableSeats?: number;

  @IsOptional()
  @IsString()
  dateRange?: string;

  @IsOptional()
  @IsString()
  status?: string;
}