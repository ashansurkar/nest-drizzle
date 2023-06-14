import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
  user_id: serial('user_id').primaryKey(),
  email: text('email'),
});
