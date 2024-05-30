import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();
// eslint-disable-next-line no-restricted-syntax
export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
