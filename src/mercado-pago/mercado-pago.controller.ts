import {
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateSubscriptionUseCase } from './use-case/create-subscription.use-case';

@Controller('mercado-pago')
@UseGuards(JwtAuthGuard)
export class MercadoPagoController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
  ) {}

  @Post('subscription/:clientId')
  async createSubscription(
    @Param('clientId') clientId: string,
  ) {
    return this.createSubscriptionUseCase.execute(clientId);
  }
}