import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class DiagnosisNotFoundException extends BaseException {
  constructor(public readonly diagnosisId: number) {
    super(`Diagnosis with id '${diagnosisId}' not found`, ModuleEnum.DIAGNOSIS);
  }
}
