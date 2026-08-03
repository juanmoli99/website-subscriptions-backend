import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class ClearMercadoPagoSubscriptionUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(id: string) {
    return this.clientsRepository.clearMercadoPagoSubscription(
      id,
    );
  }
}