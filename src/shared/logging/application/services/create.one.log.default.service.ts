import { Inject, Injectable, Logger } from '@nestjs/common';
import { LOGGING_POSTGRES_REPOSITORY } from '@common/constants/logging.constants';
import { Log } from '@shared/logging/domain/models/log';
import { CreateOneLogUseCase } from '../ports/in/create.one.log.use.case';
import { LogPersistencePort } from '../ports/out/log.persistence.port';
import { Level } from '@shared/logging/domain/enums/level.enum';

@Injectable()
export class CreateOneLogDefaultService implements CreateOneLogUseCase {
  private readonly logger = new Logger();
  constructor(
    @Inject(LOGGING_POSTGRES_REPOSITORY)
    private readonly logPersistencePort: LogPersistencePort,
  ) {}
  async execute(log: Log): Promise<Log> {
    this.logInternally(log);
    const savedLog = await this.logPersistencePort.createOneLog(log);
    return savedLog;
  }
  private logInternally(log: Log): void {
    const message = `[${log.module}] [${log.layer}] ${log.message}`;
    switch (log.level) {
      case Level.FATAL:
      case Level.ERROR:
        this.logger.error(message);
        break;
      case Level.WARNING:
        this.logger.warn(message);
        break;
      case Level.INFO:
        this.logger.log(message);
        break;
      case Level.DEBUG:
        this.logger.debug(message);
        break;
    }
  }
}
