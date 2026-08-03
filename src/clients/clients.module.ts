import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsController } from './controller/clients.controller';
import { ClientsRepository } from './repository/clients.repository';
import { ClientsService } from './service/clients.service';
import { CreateClientUseCase } from './use-case/create-client.use-case';
import { FindAllClientsUseCase } from './use-case/find-all-clients.use-case';
import { FindClientByIdUseCase } from './use-case/find-client-by-id.use-case';
import { UpdateClientStatusUseCase } from './use-case/update-client-status.use-case';
import { UpdateClientUseCase } from './use-case/update-client.use-case';
import { ValidateClientDomainUseCase } from './use-case/validate-client-domain.use-case';
import { ValidateClientEmailUseCase } from './use-case/validate-client-email.use-case';
import { ValidateUpdateClientUseCase } from './use-case/validate-update-client.use-case';
import { ClearMercadoPagoSubscriptionUseCase } from './use-case/clear-mercado-pago-subscription.use-case';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ClientsRepository,
    FindAllClientsUseCase,
    FindClientByIdUseCase,
    CreateClientUseCase,
    UpdateClientUseCase,
    UpdateClientStatusUseCase,
    ValidateClientEmailUseCase,
    ValidateClientDomainUseCase,
    ValidateUpdateClientUseCase,
    ClearMercadoPagoSubscriptionUseCase,
  ],
  exports: [
    ClientsRepository,
  ],
})
export class ClientsModule {}