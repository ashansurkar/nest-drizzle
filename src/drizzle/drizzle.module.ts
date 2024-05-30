import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION, PG_Pool } from '../constants';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [PG_Pool],
      useFactory: async (pool: Pool) => {
        return drizzle(pool, { schema });
      },
    },
    {
      provide: PG_Pool,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
        });
        return pool;
      },
    },
    DatabaseService,
  ],
  exports: [PG_CONNECTION, DatabaseService, PG_Pool],
})
export class DrizzleModule {}
