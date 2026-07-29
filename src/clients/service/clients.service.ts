import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { UpdateClientStatusDto } from '../dto/update-client-status.dto';
import { CreateClientUseCase } from '../use-case/create-client.use-case';
import { FindAllClientsUseCase } from '../use-case/find-all-clients.use-case';
import { FindClientByIdUseCase } from '../use-case/find-client-by-id.use-case';
import { UpdateClientStatusUseCase } from '../use-case/update-client-status.use-case';
import { UpdateClientUseCase } from '../use-case/update-client.use-case';

@Injectable()
export class ClientsService {
  constructor(
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly findClientByIdUseCase: FindClientByIdUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly updateClientStatusUseCase: UpdateClientStatusUseCase,
  ) {}

  async findAll() {
    return this.findAllClientsUseCase.execute();
  }

  async findById(id: string) {
    return this.findClientByIdUseCase.execute(id);
  }

  async create(createClientDto: CreateClientDto) {
    return this.createClientUseCase.execute(createClientDto);
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ) {
    return this.updateClientUseCase.execute(
      id,
      updateClientDto,
    );
  }

  async updateStatus(
    id: string,
    updateClientStatusDto: UpdateClientStatusDto,
  ) {
    return this.updateClientStatusUseCase.execute(
      id,
      updateClientStatusDto,
    );
  }
}