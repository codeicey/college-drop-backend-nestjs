import { Controller, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('passenger-details')
// @UseGuards(
    // JwtAuthGuard, 
    // RolesGuard)
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  // @Roles(Role.PASSENGER)
  async create(@Req() req, @Body() createPassengerDto: CreatePassengerDto) {
    req;
    return this.passengerService.create(
      // req.user.role, 
      createPassengerDto);
  }

  @Patch(':id')
  // @Roles(Role.PASSENGER)
  async update(@Req() req, @Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengerService.update(req.user.role, id, updatePassengerDto);
  }

  @Delete(':id')
  // @Roles(Role.PASSENGER)
  async delete(@Req() req, @Param('id') id: string) {
    return this.passengerService.delete(req.user.role, id);
  }
}
