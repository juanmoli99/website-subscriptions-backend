import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WebhookEventsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByMercadoPagoEventId(
    mercadoPagoEventId: string,
  ) {
    return this.prisma.webhookEvent.findUnique({
      where: {
        mercadoPagoEventId,
      },
    });
  }

  async create(data: {
    mercadoPagoEventId: string;
    eventType: string;
    resourceId?: string;
  }) {
    return this.prisma.webhookEvent.create({
      data,
    });
  }

  async markAsProcessed(
    id: string,
  ) {
    return this.prisma.webhookEvent.update({
      where: {
        id,
      },
      data: {
        processedAt: new Date(),
      },
    });
  }
}