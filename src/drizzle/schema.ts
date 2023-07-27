import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').primaryKey(),
  role_id: integer('role_id'),
});

export const user_role = pgTable('user_role', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const usersRelations = relations(users, ({ one }) => ({
  user_role: one(user_role, {
    fields: [users.role_id],
    references: [user_role.id],
  }),
}));
