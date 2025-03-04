import { KYCStatus } from '@prisma/client';

export class KycEntity {
  id: string;
  userId: string;
  status: KYCStatus;
  driverDetailsId?: string;
  passengerDetailsId?: string;
  createdAt: Date;
  updatedAt: Date;
}
