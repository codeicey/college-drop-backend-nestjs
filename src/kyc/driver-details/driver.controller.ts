import { Controller, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('driver-details')
// @UseGuards(
    // JwtAuthGuard, 
    // RolesGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  // @Roles(Role.DRIVER)
  async create(@Req() req, @Body() createDriverDto: CreateDriverDto) {
    req;
    return this.driverService.create(
      // req.user.role, 
      createDriverDto);
  }

  @Patch(':id')
  // @Roles(Role.DRIVER)
  async update(@Req() req, @Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(req.user.role, id, updateDriverDto);
  }

  @Delete(':id')
  // @Roles(Role.DRIVER)
  async delete(@Req() req, @Param('id') id: string) {
    return this.driverService.delete(req.user.role, id);
  }
}
