import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoService } from './mercado-pago.service';
import { CreateSubscriptionUseCase } from './use-case/create-subscription.use-case';
import { MercadoPagoController } from './mercado-pago.controller';
import { ProcessPaymentWebhookUseCase } from './use-case/process-payment-webhook.use-case';
import { PaymentsModule } from '../payments/payments.module';
import { WebhookEventsModule } from '../webhook-events/webhook-events.module';
import { ProcessSubscriptionWebhookUseCase } from './use-case/process-subscription-webhook/process-subscription-webhook.use-case';

    @Module({
    imports: [
    ConfigModule,
    ClientsModule,
    PaymentsModule,
    WebhookEventsModule,
    ],
    controllers: [
        MercadoPagoController,
    ],
    providers: [
    MercadoPagoService,
    CreateSubscriptionUseCase,
    ProcessPaymentWebhookUseCase,
    ProcessSubscriptionWebhookUseCase,
    ],
    exports: [
        MercadoPagoService,
        CreateSubscriptionUseCase,
    ],
    })
    export class MercadoPagoModule {}