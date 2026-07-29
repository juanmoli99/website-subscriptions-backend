import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsRepository } from './repository/payments.repository';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    PaymentsRepository,
  ],
  exports: [
    PaymentsRepository,
  ],
})
export class PaymentsModule {}