import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts', // Path to schema file
  out: './src/drizzle/migrations', // Path to output directory
  dialect: 'postgresql', // Database dialect
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
