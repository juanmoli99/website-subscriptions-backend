import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientResponseDto } from '../dto/client-response.dto';
import { UpdateClientStatusDto } from '../dto/update-client-status.dto';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class UpdateClientStatusUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateClientStatusDto,
  ): Promise<ClientResponseDto> {
    const existingClient = await this.clientsRepository.findById(id);

    if (!existingClient) {
      throw new NotFoundException(
        'Cliente no encontrado.',
      );
    }

    const client = await this.clientsRepository.updateStatus(
      id,
      data.status,
    );

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      domain: client.domain,
      monthlyAmount: client.monthlyAmount.toString(),
      billingDay: client.billingDay,
      mercadoPagoSubscriptionId: client.mercadoPagoSubscriptionId,
      mercadoPagoSubscriptionUrl: client.mercadoPagoSubscriptionUrl,
      status: client.status,
      lastApprovedPaymentAt: client.lastApprovedPaymentAt,
      nextPaymentDueAt: client.nextPaymentDueAt,
      gracePeriodEndsAt: client.gracePeriodEndsAt,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}