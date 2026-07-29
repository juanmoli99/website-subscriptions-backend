import { Injectable } from '@nestjs/common';
import { ClientStatus } from '@prisma/client';
import { ClientsRepository } from '../../clients/repository/clients.repository';
import { MercadoPagoService } from '../mercado-pago.service';

@Injectable()
export class ProcessPaymentWebhookUseCase {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(paymentId: string) {
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

    const approvedAt =
      payment.date_approved
        ? new Date(payment.date_approved)
        : new Date();

    await this.clientsRepository.updatePaymentApprovedData(
      clientId,
      {
        status: ClientStatus.ACTIVE,
        mercadoPagoSubscriptionStatus: 'authorized',
        lastApprovedPaymentAt: approvedAt,
      },
    );

    return {
      message: 'Cliente activado correctamente.',
    };
  }
}