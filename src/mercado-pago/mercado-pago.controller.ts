import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateSubscriptionUseCase } from './use-case/create-subscription.use-case';
import { ProcessPaymentWebhookUseCase } from './use-case/process-payment-webhook.use-case';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly processPaymentWebhookUseCase: ProcessPaymentWebhookUseCase,
  ) {}

    @Post('webhook')
    async webhook(
    @Body() body: any,
    ) {
    const paymentId = body?.data?.id;
    const eventId = body?.id;
    const eventType = body?.type;

    if (!paymentId) {
        return {
        message: 'Webhook recibido sin payment id.',
        };
    }

    return this.processPaymentWebhookUseCase.execute(
        paymentId,
        eventId,
        eventType,
    );
    }

  @UseGuards(JwtAuthGuard)
  @Post('subscription/:clientId')
  async createSubscription(
    @Param('clientId') clientId: string,
  ) {
    return this.createSubscriptionUseCase.execute(clientId);
  }
}