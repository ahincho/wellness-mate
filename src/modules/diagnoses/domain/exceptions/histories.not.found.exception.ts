import { ModuleEnum } from '@common/enums/module.enum';
import { BaseException } from '@common/exceptions/base.exception';

export class HistoriesNotFoundException extends BaseException {
  constructor(public readonly patientId: number) {
    super(
      `There are no histories for patient with id '${patientId}'`,
      ModuleEnum.PATIENT,
    );
  }
}
