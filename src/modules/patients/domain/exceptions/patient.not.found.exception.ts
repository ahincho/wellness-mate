import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class PatientNotFoundException extends BaseException {
  constructor(public readonly patientId: number) {
    super(`Patient with id '${patientId}' not found`, ModuleEnum.PATIENT);
  }
}
