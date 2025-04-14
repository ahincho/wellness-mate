import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class ChatException extends BaseException {
  constructor(message: string) {
    super(message, ModuleEnum.AI);
  }
}
