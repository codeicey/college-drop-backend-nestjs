import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Patch('verify-kyc/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  verifyKyc(@Param('id') id: string) {
    return this.adminService.verifyKyc(id);
  }
}
