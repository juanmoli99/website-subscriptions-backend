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
import { ProcessSubscriptionWebhookUseCase } from './use-case/process-subscription-webhook/process-subscription-webhook.use-case';

@Controller('mercado-pago')
export class MercadoPagoController {
constructor(
  private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
  private readonly processPaymentWebhookUseCase: ProcessPaymentWebhookUseCase,
  private readonly processSubscriptionWebhookUseCase: ProcessSubscriptionWebhookUseCase,
) {}

    @Post('webhook')
    async webhook(
      @Body() body: any,
    ) {
      const eventType = body?.type;
      const eventId = body?.id;

      if (eventType === 'payment') {
        const paymentId = body?.data?.id;

        if (!paymentId) {
          return {
            message: 'Webhook de pago sin payment id.',
          };
        }

        return this.processPaymentWebhookUseCase.execute(
          paymentId,
          eventId,
          eventType,
        );
      }

      if (eventType === 'subscription_preapproval') {
        const subscriptionId = body?.data?.id;

        if (!subscriptionId) {
          return {
            message: 'Webhook de suscripción sin id.',
          };
        }

        return this.processSubscriptionWebhookUseCase.execute(
          subscriptionId,
        );
      }

      return {
        message: 'Evento recibido.',
      };
    }

    @UseGuards(JwtAuthGuard)
    @Post('subscription/:clientId')
    async createSubscription(
      @Param('clientId') clientId: string,
    ) {
      return this.createSubscriptionUseCase.execute(clientId);
    }

}