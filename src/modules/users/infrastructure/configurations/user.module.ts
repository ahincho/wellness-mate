import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@config/app/app.config.module';
import {
  CREATE_ONE_USER_DEFAULT_SERVICE,
  FIND_ONE_USER_DEFAULT_SERVICE,
  USER_POSTGRES_REPOSITORY,
} from '@common/constants/users.constants';
import { CryptoModule } from '@shared/crypto/configurations/crypto.module';
import { LoggingModule } from '@shared/logging/infrastructure/configurations/logging.module';
import { CreateOneUserService } from '@users/application/services/create.one.user.service';
import { FindOneUserService } from '@users/application/services/find.one.user.service';
import { CreateOneUserRestController } from '../adapters/in/rest/controllers/create.one.user.rest.controller';
import { FindOneUserRestController } from '../adapters/in/rest/controllers/find.one.user.rest.controller';
import { UserHttpExceptionFilter } from '../adapters/in/rest/filters/user.http.exceptions.filter';
import { RoleEntity } from '../adapters/out/persistence/postgresql/entities/role.entity';
import { UserEntity } from '../adapters/out/persistence/postgresql/entities/user.entity';
import { UserPostgresPersistenceAdapter } from '../adapters/out/persistence/postgresql/implementations/user.postgres.persistence.adapter';

@Module({
  imports: [
    AppConfigModule,
    CryptoModule,
    LoggingModule,
    TypeOrmModule.forFeature([RoleEntity, UserEntity]),
  ],
  providers: [
    {
      provide: USER_POSTGRES_REPOSITORY,
      useClass: UserPostgresPersistenceAdapter,
    },
    {
      provide: CREATE_ONE_USER_DEFAULT_SERVICE,
      useClass: CreateOneUserService,
    },
    {
      provide: FIND_ONE_USER_DEFAULT_SERVICE,
      useClass: FindOneUserService,
    },
    {
      provide: APP_FILTER,
      useClass: UserHttpExceptionFilter,
    },
  ],
  controllers: [CreateOneUserRestController, FindOneUserRestController],
  exports: [
    {
      provide: USER_POSTGRES_REPOSITORY,
      useClass: UserPostgresPersistenceAdapter,
    },
    {
      provide: CREATE_ONE_USER_DEFAULT_SERVICE,
      useClass: CreateOneUserService,
    },
    {
      provide: FIND_ONE_USER_DEFAULT_SERVICE,
      useClass: FindOneUserService,
    },
  ],
})
export class UserModule {}
