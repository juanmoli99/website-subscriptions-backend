import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAdminByEmail(email: string) {
    return this.prisma.adminUser.findUnique({
      where: {
        email,
      },
    });
  }
}