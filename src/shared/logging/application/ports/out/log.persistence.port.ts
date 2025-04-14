import { Log } from '@shared/logging/domain/models/log';

export interface LogPersistencePort {
  createOneLog(log: Log): Promise<Log>;
}
