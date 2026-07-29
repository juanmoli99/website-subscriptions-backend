import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { AdminUserDto } from '../dto/admin-user.dto';
import { AdminUsersService } from '../service/admin-users.service';

@Controller('admin-users')
@UseGuards(JwtAuthGuard)
export class AdminUsersController {
  constructor(
    private readonly adminUsersService: AdminUsersService,
  ) {}

  @Get()
  async findAll(): Promise<AdminUserDto[]> {
    return this.adminUsersService.findAll();
  }
}