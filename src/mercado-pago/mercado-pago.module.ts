import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoService } from './mercado-pago.service';
import { CreateSubscriptionUseCase } from './use-case/create-subscription.use-case';
import { MercadoPagoController } from './mercado-pago.controller';
import { ProcessPaymentWebhookUseCase } from './use-case/process-payment-webhook.use-case';

    @Module({
    imports: [
        ConfigModule,
        ClientsModule,
    ],
    controllers: [
        MercadoPagoController,
    ],
    providers: [
    MercadoPagoService,
    CreateSubscriptionUseCase,
    ProcessPaymentWebhookUseCase,
    ],
    exports: [
        MercadoPagoService,
        CreateSubscriptionUseCase,
    ],
    })
    export class MercadoPagoModule {}