import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycDto } from './dto/create-kyc.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
// import { JwtAuthGuard } from '../common/guards/rbac.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('kyc')
@UseGuards(
    // JwtAuthGuard,
     RolesGuard)
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post()
  // @Roles(Role.ADMIN)
  async createKyc(
    // @Req() req, 
  @Body() createKycDto: CreateKycDto) {
    // req;
    return this.kycService.createKyc(
      // req.user.role, 
      createKycDto);
  }

  @Get(':userId')
  async getKycByUser(@Param('userId') userId: string) {
    return this.kycService.getKycByUser(userId);
  }
}
