import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyKycDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  verified: boolean;
}
