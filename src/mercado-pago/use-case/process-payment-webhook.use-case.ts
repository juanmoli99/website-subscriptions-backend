import { Injectable } from '@nestjs/common';
import {
  ClientStatus,
  PaymentStatus,
} from '@prisma/client';
import { ClientsRepository } from '../../clients/repository/clients.repository';
import { PaymentsRepository } from '../../payments/repository/payments.repository';
import { MercadoPagoService } from '../mercado-pago.service';
import { WebhookEventsRepository } from '../../webhook-events/repository/webhook-events.repository';

@Injectable()
export class ProcessPaymentWebhookUseCase {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly clientsRepository: ClientsRepository,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly webhookEventsRepository: WebhookEventsRepository,
  ) {}

  async execute(
    paymentId: string,
    eventId: string,
    eventType: string,
    ) {

    const existingEvent =
    await this.webhookEventsRepository.findByMercadoPagoEventId(
        eventId,
    );

    if (existingEvent) {
    return {
        message: 'Evento ya procesado.',
    };
    }

    const webhookEvent =
    await this.webhookEventsRepository.create({
        mercadoPagoEventId: eventId,
        eventType,
        resourceId: paymentId,
    });
    let payment;

    try {
      payment =
        await this.mercadoPagoService.getPayment(paymentId);
    } catch (error) {
      return {
        message: 'Pago no encontrado.',
      };
    }

    if (payment.status !== 'approved') {
      return {
        message: 'Pago no aprobado.',
      };
    }

    const clientId =
      payment.external_reference;

    if (!clientId) {
      throw new Error(
        'El pago no tiene external_reference.',
      );
    }

    const existingPayment =
      await this.paymentsRepository.findByMercadoPagoPaymentId(
        String(payment.id),
      );

    if (existingPayment) {
      return {
        message: 'Pago ya procesado.',
      };
    }

    const approvedAt =
      payment.date_approved
        ? new Date(payment.date_approved)
        : new Date();

    await this.paymentsRepository.create({
      clientId,
      mercadoPagoPaymentId: String(payment.id),
      amount: payment.transaction_amount,
      status: PaymentStatus.APPROVED,
      approvedAt,
    });

const client =
  await this.clientsRepository.findById(clientId);

    let nextPaymentDueAt: Date | undefined;
    let gracePeriodEndsAt: Date | undefined;

    if (client?.mercadoPagoSubscriptionId) {
    const subscription =
        await this.mercadoPagoService.getPreApprovalById(
        client.mercadoPagoSubscriptionId,
        );

    if (subscription.next_payment_date) {
        nextPaymentDueAt =
        new Date(subscription.next_payment_date);

        gracePeriodEndsAt =
        new Date(nextPaymentDueAt);

        gracePeriodEndsAt.setDate(
        gracePeriodEndsAt.getDate() + 3,
        );
    }
    }

    await this.clientsRepository.updatePaymentApprovedData(
    clientId,
        {
            status: ClientStatus.ACTIVE,
            mercadoPagoSubscriptionStatus: 'authorized',
            lastApprovedPaymentAt: approvedAt,
            nextPaymentDueAt,
            gracePeriodEndsAt,
        },
    );
    await this.webhookEventsRepository.markAsProcessed(
    webhookEvent.id,
    );

    return {
      message: 'Pago registrado y cliente activado correctamente.',
    };
  }
}