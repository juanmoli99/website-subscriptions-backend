import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { SubscriptionExpirationService } from './subscription-expiration/subscription-expiration.service';

@Module({
  imports: [
    ClientsModule,
  ],
  providers: [
    SubscriptionExpirationService,
  ],
})
export class TasksModule {}