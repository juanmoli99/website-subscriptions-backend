import { Controller, Post } from '@nestjs/common';
import { SubscriptionExpirationService } from '../subscription-expiration/subscription-expiration.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly subscriptionExpirationService: SubscriptionExpirationService,
  ) {}

  @Post('subscription-expiration')
  async runSubscriptionExpiration() {
    return this.subscriptionExpirationService.forceCheckExpiredSubscriptions();
  }
}