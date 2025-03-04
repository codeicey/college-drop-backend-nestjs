import { RideStatus } from '@prisma/client';

export class RideRequestEntity {
  id: string;
  passengerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  requestTime: Date;
  status: RideStatus;
}
