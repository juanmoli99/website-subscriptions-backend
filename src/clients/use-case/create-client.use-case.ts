import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClientResponseDto } from '../dto/client-response.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientsRepository } from '../repository/clients.repository';
import { ValidateClientDomainUseCase } from './validate-client-domain.use-case';
import { ValidateClientEmailUseCase } from './validate-client-email.use-case';

@Injectable()
export class CreateClientUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly validateClientEmailUseCase: ValidateClientEmailUseCase,
    private readonly validateClientDomainUseCase: ValidateClientDomainUseCase,
  ) {}

  async execute(
    data: CreateClientDto,
  ): Promise<ClientResponseDto> {
    await this.validateClientEmailUseCase.execute(data.email);
    await this.validateClientDomainUseCase.execute(data.domain);

    const credentialHash = randomUUID();

    const client = await this.clientsRepository.create(
      data,
      credentialHash,
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