import { Log } from '@shared/logging/domain/models/log';
import { LogEntity } from './log.entity';

export class LogTypeOrmMapper {
  static domainToEntity(log: Log): LogEntity {
    return new LogEntity({
      module: log.module,
      layer: log.layer,
      level: log.level,
      timestamp: log.timestamp,
      message: log.message,
    });
  }
  static entityToDomain(entity: LogEntity): Log {
    return new Log({
      module: entity.module,
      layer: entity.layer,
      level: entity.level,
      timestamp: entity.timestamp,
      message: entity.message,
    });
  }
}
