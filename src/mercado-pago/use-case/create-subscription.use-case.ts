import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsRepository } from '../../clients/repository/clients.repository';
import { MercadoPagoService } from '../mercado-pago.service';

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly clientsRepository: ClientsRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(clientId: string) {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      throw new NotFoundException(
        'Cliente no encontrado.',
      );
    }

    if (client.mercadoPagoSubscriptionId) {
      throw new Error(
        'El cliente ya tiene una suscripción creada.',
      );
    }
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL');

    if (!frontendUrl) {
      throw new Error(
        'FRONTEND_URL no está configurada.',
      );
    }

    const preApproval =
      this.mercadoPagoService.getPreApproval();


    let subscription;

    try {
      subscription = await preApproval.create({
        body: {
          reason: `Suscripción ${client.name}`,
          external_reference: client.id,
          payer_email: client.email,
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: Number(client.monthlyAmount),
            currency_id: 'ARS',
          },
          back_url: frontendUrl,
        },
      });
    } catch (error) {
      console.log('ERROR MERCADO PAGO:', error);
      throw error;
    }
    if (!subscription.id || !subscription.init_point) {
        throw new Error(
            'Mercado Pago no devolvió los datos de suscripción necesarios.',
        );
    }

    await this.clientsRepository.updateMercadoPagoSubscription(
    client.id,
    subscription.id,
    subscription.init_point,
    );

    return subscription;
  }
}