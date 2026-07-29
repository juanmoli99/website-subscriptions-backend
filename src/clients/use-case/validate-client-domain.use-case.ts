import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class ValidateClientDomainUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(domain: string): Promise<void> {
    const client = await this.clientsRepository.findByDomain(domain);

    if (client) {
      throw new ConflictException(
        'Ya existe un cliente con ese dominio.',
      );
    }
  }
}