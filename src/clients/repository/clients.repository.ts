import { Injectable } from '@nestjs/common';
import { ClientStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.client.findUnique({
      where: {
        email,
      },
    });
  }

  async findByDomain(domain: string) {
    return this.prisma.client.findUnique({
      where: {
        domain,
      },
    });
  }

  async create(
    data: CreateClientDto,
    credentialHash: string,
  ) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        domain: data.domain,
        monthlyAmount: data.monthlyAmount,
        billingDay: data.billingDay,
        credentialHash,
        status: ClientStatus.PENDING,
      },
    });
  }

  async update(
    id: string,
    data: UpdateClientDto,
  ) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(
    id: string,
    status: ClientStatus,
  ) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async updateMercadoPagoSubscription(
    id: string,
    mercadoPagoSubscriptionId: string,
    mercadoPagoSubscriptionUrl: string,
  ) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data: {
        mercadoPagoSubscriptionId,
        mercadoPagoSubscriptionUrl,
      },
    });
  }

  async updatePaymentApprovedData(
    id: string,
    data: {
      status: ClientStatus;
      mercadoPagoSubscriptionStatus: string;
      lastApprovedPaymentAt: Date;
      nextPaymentDueAt?: Date;
      gracePeriodEndsAt?: Date;
    },
  ) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data,
    });
  }
}