import { Log } from '@shared/logging/domain/models/log';

export interface CreateOneLogUseCase {
  execute(log: Log): Promise<Log>;
}
