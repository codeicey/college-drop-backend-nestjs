import { Controller, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('vehicle')
@UseGuards(
    // JwtAuthGuard, 
    RolesGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @Roles(Role.DRIVER)
  async create(@Req() req, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(req.user.role, req.user.id, createVehicleDto);
  }

  @Patch(':id')
  @Roles(Role.DRIVER)
  async update(@Req() req, @Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(req.user.role, req.user.id, id, updateVehicleDto);
  }

  @Delete(':id')
  @Roles(Role.DRIVER)
  async delete(@Req() req, @Param('id') id: string) {
    return this.vehicleService.delete(req.user.role, req.user.id, id);
  }
}
