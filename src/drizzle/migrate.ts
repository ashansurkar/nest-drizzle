import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';

import * as allSchema from './schema';

dotenv.config();
let dbCreds = {
  user: process.env.DB_USER || process.env.username,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: false,
};

(async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  let db: NodePgDatabase<typeof allSchema> | null = null;
  db = drizzle(pool, {
    schema: {
      ...allSchema,
    },
  });

  const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations');
  await migrate(db, { migrationsFolder: migrationPath });
  for (const role of ['Super Admin', 'Admin', 'User', 'Guest']) {
    const existingUserRole = await db
      ?.select({
        name: allSchema.user_role.name,
      })
      .from(allSchema.user_role)
      .where(eq(allSchema.user_role.name, role));
    if (!existingUserRole[0]) {
      await db?.insert(allSchema.user_role).values({ name: role });
    }
  }
  console.log('Migration complete');
  exit(0);
})();
