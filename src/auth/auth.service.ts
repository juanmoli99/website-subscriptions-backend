import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './use-case/login.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.loginUseCase.execute(email, password);

    const token = await this.jwtService.signAsync({
      sub: admin.id,
      email: admin.email,
    });

    return {
      token,
      admin,
    };
  }
}