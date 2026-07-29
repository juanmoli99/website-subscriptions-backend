import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: {
    clientId: string;
    mercadoPagoPaymentId: string;
    amount: number;
    status: PaymentStatus;
    approvedAt?: Date;
  }) {
    return this.prisma.payment.create({
      data,
    });
  }

  async findByMercadoPagoPaymentId(
    mercadoPagoPaymentId: string,
  ) {
    return this.prisma.payment.findUnique({
      where: {
        mercadoPagoPaymentId,
      },
    });
  }
}