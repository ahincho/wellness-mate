import { ModuleEnum } from '@common/enums/module.enum';
import { Level } from '../enums/level.enum';
import { Layer } from '../enums/layer.enum';

export class Log {
  module: ModuleEnum;
  layer: Layer;
  level: Level;
  timestamp: Date;
  message: string;
  constructor(partial?: Partial<Log>) {
    if (partial) {
      Object.assign(this, partial);
    }
    this.timestamp = partial?.timestamp ?? new Date();
  }
}
