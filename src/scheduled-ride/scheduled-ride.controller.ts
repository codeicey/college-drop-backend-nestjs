import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ScheduledRideService } from './scheduled-ride.service';
import { CreateScheduledRideDto } from './dto/create-scheduled-ride.dto';
import { UpdateScheduledRideDto } from './dto/update-scheduled-ride.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '@prisma/client';
// import { KycGuard } from '../auth/kyc.guard';

@Controller('scheduled-rides')
// @UseGuards(KycGuard) // Ensure only KYC verified users access this module
export class ScheduledRideController {
  constructor(private readonly scheduledRideService: ScheduledRideService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.DRIVER, Role.PASSENGER)
  create(@Body() createScheduledRideDto: CreateScheduledRideDto) {
    return this.scheduledRideService.create(createScheduledRideDto);
  }

  @Get()
  findAll() {
    return this.scheduledRideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledRideService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.DRIVER, Role.PASSENGER)
  update(@Param('id') id: string, @Body() updateScheduledRideDto: UpdateScheduledRideDto) {
    return this.scheduledRideService.update(id, updateScheduledRideDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.DRIVER, Role.PASSENGER)
  remove(@Param('id') id: string) {
    return this.scheduledRideService.remove(id);
  }
}