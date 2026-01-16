import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { UserRepositoryDatabase } from './users.repository.database';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryDatabase,
    },
    ...usersProviders,
  ],
  exports: [UsersService, 'UserRepository'],
})
export class UsersModule {}
