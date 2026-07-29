import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientResponseDto } from '../dto/client-response.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientsRepository } from '../repository/clients.repository';
import { ValidateUpdateClientUseCase } from './validate-update-client.use-case';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly validateUpdateClientUseCase: ValidateUpdateClientUseCase,
  ) {}

  async execute(
    id: string,
    data: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const existingClient = await this.clientsRepository.findById(id);

    if (!existingClient) {
      throw new NotFoundException(
        'Cliente no encontrado.',
      );
    }

    await this.validateUpdateClientUseCase.execute(
      id,
      data,
    );

    const client = await this.clientsRepository.update(
      id,
      data,
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