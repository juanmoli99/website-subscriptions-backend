import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { SubscriptionExpirationService } from './subscription-expiration/subscription-expiration.service';
import { TasksController } from './controller/tasks.controller';

@Module({
  imports: [
    ClientsModule,
  ],
  controllers: [
    TasksController,
  ],
  providers: [
    SubscriptionExpirationService,
  ],
})
export class TasksModule {}