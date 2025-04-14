import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ModuleEnum } from '@common/enums/module.enum';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { LogPersistencePort } from '@shared/logging/application/ports/out/log.persistence.port';
import { LogTypeOrmMapper } from './log.type.orm.mapper';
import { LogEntity } from './log.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LogPostgresPersistenceAdapter implements LogPersistencePort {
  private readonly logger = new Logger(ModuleEnum.LOGGING);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async createOneLog(log: Log): Promise<Log> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const logEntity = LogTypeOrmMapper.domainToEntity(log);
        const savedLog = await manager.save(LogEntity, logEntity);
        return LogTypeOrmMapper.entityToDomain(savedLog);
      });
    } catch (error) {
      const message = 'Failed to persist the log';
      this.logger.error(message);
      return Promise.resolve(
        new Log({
          module: ModuleEnum.LOGGING,
          layer: Layer.INFRASTRUCTURE,
          level: Level.ERROR,
          message,
        }),
      );
    }
  }
}
