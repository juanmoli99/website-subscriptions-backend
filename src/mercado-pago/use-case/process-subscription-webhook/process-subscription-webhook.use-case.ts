import { Injectable } from '@nestjs/common';
import { ClientStatus } from '@prisma/client';
import { ClientsRepository } from '../../../clients/repository/clients.repository';
import { MercadoPagoService } from '../../mercado-pago.service';

@Injectable()
export class ProcessSubscriptionWebhookUseCase {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(subscriptionId: string) {
    let subscription;

    try {
      subscription =
        await this.mercadoPagoService.getSubscriptionById(
          subscriptionId,
        );
    } catch (error) {
      return {
        message: 'Suscripción no encontrada.',
      };
    }

    const clientId =
      subscription.external_reference;

    if (!clientId) {
      return {
        message: 'La suscripción no tiene external_reference.',
      };
    }

    if (subscription.status === 'cancelled') {
      return {
        message: 'Suscripción cancelada en Mercado Pago.',
      };
    }

    if (subscription.status === 'authorized') {
      await this.clientsRepository.updateStatus(
        clientId,
        ClientStatus.ACTIVE,
      );

      return {
        message: 'Cliente activado correctamente.',
      };
    }

    return {
      message: 'Estado de suscripción recibido.',
    };
  }
}