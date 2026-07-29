import { Injectable } from '@nestjs/common';
import { AdminUserDto } from '../dto/admin-user.dto';
import { FindAllAdminUsersUseCase } from '../use-case/find-all-admin-users.use-case';

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly findAllAdminUsersUseCase: FindAllAdminUsersUseCase,
  ) {}

  async findAll(): Promise<AdminUserDto[]> {
    return this.findAllAdminUsersUseCase.execute();
  }
}