import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class CredentialException extends BaseException {
  constructor(public readonly message: string) {
    super(message, ModuleEnum.AUTH);
  }
}
