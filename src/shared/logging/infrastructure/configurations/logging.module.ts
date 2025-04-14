import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CREATE_ONE_LOG_DEFAULT_SERVICE,
  LOGGING_POSTGRES_REPOSITORY,
} from '@common/constants/logging.constants';
import { CreateOneLogDefaultService } from '@shared/logging/application/services/create.one.log.default.service';
import { LogEntity } from '../adapters/out/persistence/postgresql/log.entity';
import { LogPostgresPersistenceAdapter } from '../adapters/out/persistence/postgresql/log.postgres.persistence.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  providers: [
    {
      provide: CREATE_ONE_LOG_DEFAULT_SERVICE,
      useClass: CreateOneLogDefaultService,
    },
    {
      provide: LOGGING_POSTGRES_REPOSITORY,
      useClass: LogPostgresPersistenceAdapter,
    },
  ],
  controllers: [],
  exports: [
    {
      provide: CREATE_ONE_LOG_DEFAULT_SERVICE,
      useClass: CreateOneLogDefaultService,
    },
  ],
})
export class LoggingModule {}
