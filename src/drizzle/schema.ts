import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
  user_id: serial('user_id').primaryKey(),
  email: text('email'),
  aws_cognito_id: text('aws_cognito_id'),
  role_id: integer('role_id'),
  employer_id: integer('employer_id'),
});
