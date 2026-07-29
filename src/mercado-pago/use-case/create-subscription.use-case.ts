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
    const frontendUrl =
    this.configService.get<string>('FRONTEND_URL') ??
    'https://www.google.com';

    console.log('FRONTEND_URL:', frontendUrl);

    const preApproval =
      this.mercadoPagoService.getPreApproval();


    const subscription = await preApproval.create({
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