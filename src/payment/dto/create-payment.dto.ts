import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { PaymentMethod } from '../payment.enum';

export class CreatePaymentDto {
  @IsOptional()
  rideId?: string;

  @IsOptional()
  scheduledRideId?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;
}