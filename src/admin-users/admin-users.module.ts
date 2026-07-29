import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { AdminUsersController } from './controller/admin-users.controller';
import { AdminUsersRepository } from './repository/admin-users.repository';
import { AdminUsersService } from './service/admin-users.service';
import { FindAllAdminUsersUseCase } from './use-case/find-all-admin-users.use-case';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [AdminUsersController],
  providers: [
    AdminUsersService,
    AdminUsersRepository,
    FindAllAdminUsersUseCase,
  ],
})
export class AdminUsersModule {}