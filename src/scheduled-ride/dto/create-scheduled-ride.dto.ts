import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateScheduledRideDto {
  @IsString()
  postedById: string;

  @IsBoolean()
  isDriverPosting: boolean;

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

  @IsString()
  location: string;

  @IsNumber()
  availableSeats: number;

  @IsString()
  dateRange: string;

  @IsOptional()
  @IsString()
  status?: string;
}