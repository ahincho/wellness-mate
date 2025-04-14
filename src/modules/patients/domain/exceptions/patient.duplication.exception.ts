import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class PatientDuplicationException extends BaseException {
  constructor(field: string, value: string) {
    super(
      `Patient with ${field} '${value}' already exists`,
      ModuleEnum.PATIENT,
    );
  }
}
