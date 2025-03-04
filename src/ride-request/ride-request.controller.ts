import { Controller, Post, Get, Patch, Body, Param, Req, UseGuards, Delete } from '@nestjs/common';
import { RideRequestService } from './ride-request.service';
import { CreateRideRequestDto } from './dto/create-ride-request.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('ride-request')
@UseGuards(
  // JwtAuthGuard, 
  RolesGuard)
export class RideRequestController {
  constructor(private readonly rideRequestService: RideRequestService) {}

  @Post()
  @Roles(Role.PASSENGER)
  async create(@Req() req, @Body() createRideRequestDto: CreateRideRequestDto) {
    return this.rideRequestService.create(req.user.role, req.user.id, req.user.kycVerified, createRideRequestDto);
  }

  @Get()
  async findAll() {
    return this.rideRequestService.findAll();
  }

  @Patch(':id/accept')
  @Roles(Role.DRIVER)
  async acceptRide(@Req() req, @Param('id') rideRequestId: string ,fare: number) {
    return this.rideRequestService.acceptRide(req.user.role, req.user.id , rideRequestId, fare,req.user.kycVerified);
  }

}
