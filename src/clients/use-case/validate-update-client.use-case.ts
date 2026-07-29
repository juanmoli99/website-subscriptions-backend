import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ClientsRepository } from '../repository/clients.repository';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ValidateUpdateClientUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateClientDto,
  ): Promise<void> {
    if (data.email) {
      const client = await this.clientsRepository.findByEmail(
        data.email,
      );

      if (client && client.id !== id) {
        throw new ConflictException(
          'Ya existe un cliente con ese email.',
        );
      }
    }

    if (data.domain) {
      const client = await this.clientsRepository.findByDomain(
        data.domain,
      );

      if (client && client.id !== id) {
        throw new ConflictException(
          'Ya existe un cliente con ese dominio.',
        );
      }
    }
  }
}