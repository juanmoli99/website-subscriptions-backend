import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AdminUsersModule,
    ClientsModule,
    MercadoPagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}