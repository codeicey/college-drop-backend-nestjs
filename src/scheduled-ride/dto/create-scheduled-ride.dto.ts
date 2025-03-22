import { ScheduleStatus } from '@prisma/client';
import { IsString, IsBoolean, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateScheduledRideDto {
  @IsString()
  postedById: string; // This must be a string, which is the type for the 'postedById' in the Prisma model.

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
  @IsEnum(ScheduleStatus)  // Use the ScheduleStatus enum here
  status?: ScheduleStatus;  // This ensures the value of status is valid and can only be 'OPEN', 'CLOSED', or 'CANCELED'
}
