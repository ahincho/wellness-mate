import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from './base.exception';

export class DatabaseException extends BaseException {
  constructor(public readonly message: string) {
    super(message, ModuleEnum.DATABASE);
  }
}
