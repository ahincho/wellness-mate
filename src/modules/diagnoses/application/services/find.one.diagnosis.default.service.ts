import { Inject, Injectable } from '@nestjs/common';
import { CREATE_ONE_LOG_DEFAULT_SERVICE } from '@common/constants/logging.constants';
import { DIAGNOSIS_POSTGRES_REPOSITORY } from '@common/constants/diagnoses.constants';
import { Log } from '@shared/logging/domain/models/log';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { CreateOneLogUseCase } from '@shared/logging/application/ports/in/create.one.log.use.case';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisNotFoundException } from '@diagnoses/domain/exceptions/diagnosis.not.found.exception';
import { FindOneDiagnosisUseCase } from '../ports/in/find.one.diagnosis.use.case';
import { DiagnosisPersistencePort } from '../ports/out/diagnosis.peristence.port';

@Injectable()
export class FindOneDiagnosisDefaultService implements FindOneDiagnosisUseCase {
  constructor(
    @Inject(CREATE_ONE_LOG_DEFAULT_SERVICE)
    private readonly createOneLogUseCase: CreateOneLogUseCase,
    @Inject(DIAGNOSIS_POSTGRES_REPOSITORY)
    private readonly diagnosisPersistencePort: DiagnosisPersistencePort,
  ) {}
  async execute(diagnosisId: number): Promise<Diagnosis> {
    const optionalDiagnosis =
      await this.diagnosisPersistencePort.findOneDiagnosis(diagnosisId);
    if (optionalDiagnosis.isEmpty()) {
      const exception = new DiagnosisNotFoundException(diagnosisId);
      await this.createOneLogUseCase.execute(
        new Log({
          module: exception.module,
          layer: Layer.APPLICATION,
          level: Level.WARNING,
          message: exception.message,
        }),
      );
      throw exception;
    }
    return optionalDiagnosis.get();
  }
}
