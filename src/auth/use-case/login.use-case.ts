import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(email: string, password: string) {
    const admin = await this.authRepository.findAdminByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return {
      id: admin.id,
      email: admin.email,
    };
  }
}