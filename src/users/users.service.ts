import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return await this.conn.query.users.findMany({
      with: {
        user_role: true,
      },
    });
  }
}
