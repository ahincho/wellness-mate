import { ModuleEnum } from 'src/common/enums/module.enum';

export class BaseException extends Error {
  public readonly timestamp: Date;
  public readonly module: ModuleEnum;
  constructor(message: string, module: ModuleEnum) {
    super(message);
    this.timestamp = new Date();
    this.module = module;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
