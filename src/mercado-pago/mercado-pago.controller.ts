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
import { ProcessSubscriptionPaymentWebhookUseCase } from './use-case/process-subscription-payment-webhook/process-subscription-payment-webhook.use-case';

@Controller('mercado-pago')
export class MercadoPagoController {
constructor(
  private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
  private readonly processPaymentWebhookUseCase: ProcessPaymentWebhookUseCase,
  private readonly processSubscriptionWebhookUseCase: ProcessSubscriptionWebhookUseCase,
  private readonly processSubscriptionPaymentWebhookUseCase: ProcessSubscriptionPaymentWebhookUseCase,
) {}

    @Post('webhook')
      async webhook(
        @Body() body: any,
      ) {
         console.log(
          'MERCADO PAGO WEBHOOK:',
          JSON.stringify(body),
        );
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

      if (eventType === 'subscription_authorized_payment') {
        const authorizedPaymentId = body?.data?.id;

        if (!authorizedPaymentId) {
          return {
            message: 'Webhook de pago autorizado sin id.',
          };
        }

        return this.processSubscriptionPaymentWebhookUseCase.execute(
          authorizedPaymentId,
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