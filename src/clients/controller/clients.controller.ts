import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientStatusDto } from '../dto/update-client-status.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientsService } from '../service/clients.service';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
  ) {}

  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ) {
    return this.clientsService.findById(id);
  }

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(createClientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(
      id,
      updateClientDto,
    );
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateClientStatusDto: UpdateClientStatusDto,
  ) {
    return this.clientsService.updateStatus(
      id,
      updateClientStatusDto,
    );
  }

  @Patch(':id/mercado-pago/subscription/clear')
  async clearMercadoPagoSubscription(
    @Param('id') id: string,
  ) {
    return this.clientsService.clearMercadoPagoSubscription(
      id,
    );
  }
}