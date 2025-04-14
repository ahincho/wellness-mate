import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class RoleNotFoundException extends BaseException {
  constructor(public readonly roleName: string) {
    super(`Role '${roleName}' not found`, ModuleEnum.USER);
  }
}
