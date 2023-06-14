import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
@Module({
  controllers: [UsersController],
  imports: [DrizzleModule],
  providers: [UsersService],
})
export class UsersModule {}
