import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class UserNotFoundException extends BaseException {
  constructor(public readonly userId: number) {
    super(`User with id '${userId}' not found`, ModuleEnum.USER);
  }
}
