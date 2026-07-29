import { Injectable } from '@nestjs/common';
import { AdminUsersRepository } from '../repository/admin-users.repository';
import { AdminUserDto } from '../dto/admin-user.dto';

@Injectable()
export class FindAllAdminUsersUseCase {
  constructor(
    private readonly adminUsersRepository: AdminUsersRepository,
  ) {}

  async execute(): Promise<AdminUserDto[]> {
    const admins = await this.adminUsersRepository.findAll();

    return admins.map((admin) => ({
      id: admin.id,
      email: admin.email,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }));
  }
}