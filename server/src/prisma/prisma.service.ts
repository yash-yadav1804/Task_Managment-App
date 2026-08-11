import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    let connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/task_management?schema=public';
    
    if (connectionString.startsWith('prisma+postgres://')) {
      try {
        const urlObj = new URL(connectionString);
        const apiKey = urlObj.searchParams.get('api_key');
        if (apiKey) {
          const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
          const parsed = JSON.parse(decoded);
          if (parsed.databaseUrl) {
            connectionString = parsed.databaseUrl;
          }
        }
      } catch (e) {
        console.warn('Failed to parse Prisma Postgres connection string', e);
      }
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
