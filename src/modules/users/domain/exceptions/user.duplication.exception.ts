import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class UserDuplicationException extends BaseException {
  constructor(field: string, value: string) {
    super(`User with ${field} '${value}' already exists`, ModuleEnum.USER);
  }
}
