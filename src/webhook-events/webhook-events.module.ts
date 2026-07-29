import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WebhookEventsRepository } from './repository/webhook-events.repository';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    WebhookEventsRepository,
  ],
  exports: [
    WebhookEventsRepository,
  ],
})
export class WebhookEventsModule {}