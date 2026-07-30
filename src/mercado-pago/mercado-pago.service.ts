import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MercadoPagoConfig,
  PreApproval,
  Payment,
} from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private readonly client: MercadoPagoConfig;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const accessToken =
      this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN');

    if (!accessToken) {
      throw new Error(
        'La variable MERCADO_PAGO_ACCESS_TOKEN no está definida.',
      );
    }

    this.client = new MercadoPagoConfig({
      accessToken,
    });
  }

  getClient(): MercadoPagoConfig {
    return this.client;
  }

  getPreApproval() {
    return new PreApproval(this.client);
  }

    async getPreApprovalById(id: string) {
      const preApproval = new PreApproval(this.client);

      return preApproval.get({
          id,
      });
    }

    async getAuthorizedPaymentById(id: string) {
      const response = await fetch(
        `https://api.mercadopago.com/authorized_payments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'MERCADO_PAGO_ACCESS_TOKEN',
            )}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error obteniendo pago autorizado: ${response.status}`,
        );
      }

      return response.json();
    }
    async getSubscriptionById(id: string) {
      const preApproval = new PreApproval(this.client);

      return preApproval.get({
        id,
      });
    }

    async getPayment(paymentId: string) {
      const payment = new Payment(this.client);

      return payment.get({
          id: paymentId,
      });
    }

}