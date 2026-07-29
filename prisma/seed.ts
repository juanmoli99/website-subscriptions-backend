import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('La variable DATABASE_URL no está definida.');
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  try {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await prisma.adminUser.upsert({
      where: {
        email: 'admin@admin.com',
      },
      update: {
        passwordHash,
      },
      create: {
        email: 'admin@admin.com',
        passwordHash,
      },
    });

    console.log('Administrador creado correctamente.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});