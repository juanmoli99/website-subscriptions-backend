import { Injectable } from '@nestjs/common';
import { ClientResponseDto } from '../dto/client-response.dto';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class FindAllClientsUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(): Promise<ClientResponseDto[]> {
    const clients = await this.clientsRepository.findAll();

    return clients.map((client) => ({
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
    }));
  }
}