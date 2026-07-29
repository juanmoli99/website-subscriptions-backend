import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ClientsRepository } from '../repository/clients.repository';

@Injectable()
export class ValidateClientEmailUseCase {
  constructor(
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const client = await this.clientsRepository.findByEmail(email);

    if (client) {
      throw new ConflictException(
        'Ya existe un cliente con ese email.',
      );
    }
  }
}