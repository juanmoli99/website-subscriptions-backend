import { Injectable } from '@nestjs/common';
import {
  ClientStatus,
  PaymentStatus,
} from '@prisma/client';
import { ClientsRepository } from '../../../clients/repository/clients.repository';
import { PaymentsRepository } from '../../../payments/repository/payments.repository';
import { MercadoPagoService } from '../../mercado-pago.service';

@Injectable()
export class ProcessSubscriptionPaymentWebhookUseCase {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly clientsRepository: ClientsRepository,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async execute(
    authorizedPaymentId: string,
  ) {
    let payment;

    try {
      payment =
        await this.mercadoPagoService.getAuthorizedPaymentById(
          authorizedPaymentId,
        );
    } catch (error) {
      return {
        message: 'Pago autorizado no encontrado.',
      };
    }

    const clientId =
      payment.external_reference;

    if (!clientId) {
      throw new Error(
        'El pago autorizado no tiene external_reference.',
      );
    }

    await this.paymentsRepository.create({
      clientId,
      mercadoPagoPaymentId: String(payment.id),
      amount: payment.transaction_amount,
      status: PaymentStatus.APPROVED,
      approvedAt: new Date(),
    });

    await this.clientsRepository.updatePaymentApprovedData(
      clientId,
      {
        status: ClientStatus.ACTIVE,
        mercadoPagoSubscriptionStatus: 'authorized',
        lastApprovedPaymentAt: new Date(),
        nextPaymentDueAt: payment.next_payment_date
          ? new Date(payment.next_payment_date)
          : undefined,
        gracePeriodEndsAt: payment.next_payment_date
          ? new Date(
              new Date(payment.next_payment_date)
                .setDate(
                  new Date(payment.next_payment_date).getDate() + 3,
                ),
            )
          : undefined,
      },
    );

    return {
      message:
        'Pago de suscripción registrado y cliente activado.',
    };
  }
}