import { ClientStatus } from '@prisma/client';

export class ClientResponseDto {
  id!: string;
  name!: string;
  email!: string;
  domain!: string;
  monthlyAmount!: string;
  billingDay!: number;
  mercadoPagoSubscriptionId!: string | null;
  mercadoPagoSubscriptionUrl!: string | null;
  status!: ClientStatus;
  lastApprovedPaymentAt!: Date | null;
  nextPaymentDueAt!: Date | null;
  gracePeriodEndsAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}