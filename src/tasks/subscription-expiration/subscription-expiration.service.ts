import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClientStatus } from '@prisma/client';
import { ClientsRepository } from '../../clients/repository/clients.repository';

@Injectable()
export class SubscriptionExpirationService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  @Cron('0 0 * * *')
  async checkExpiredSubscriptions() {
    const clients =
      await this.clientsRepository.findExpiredClients();

    for (const client of clients) {
      await this.clientsRepository.updateStatus(
        client.id,
        ClientStatus.SUSPENDED,
      );
    }
  }


}