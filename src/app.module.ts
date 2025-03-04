import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { KycModule } from './kyc/kyc.module';
import { DriverModule } from './kyc/driver-details/driver.module';
import { PassengerModule } from './kyc/passenger-details/passenger.module';
import { VehicleModule } from './kyc/vehicle/vehicle.module';
import { RideRequestModule } from './ride-request/ride-request.module';
import { RideModule } from './ride/ride-request.module';
import { ScheduledRideModule } from './scheduled-ride/scheduled-ride.module';
import { PaymentModule } from './payment/payment.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [    ConfigModule.forRoot(),  // Load environment variables

    AuthModule,

    UsersModule,

    AdminModule,
    KycModule,
    PassengerModule,
    DriverModule,
    VehicleModule,
    
    RideRequestModule,
    RideModule,
    ScheduledRideModule,

    PaymentModule,

    MessageModule,
    ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
