import { Inject, Injectable } from '@nestjs/common';
import { DIAGNOSIS_POSTGRES_REPOSITORY } from '@common/constants/diagnoses.constants';
import { PageResult } from '@common/models/page.result';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisFilters } from '@diagnoses/domain/models/diagnosis.filters';
import { FindDiagnosesUseCase } from '../ports/in/find.diagnoses.use.case';
import { DiagnosisPersistencePort } from '../ports/out/diagnosis.peristence.port';

@Injectable()
export class FindDiagnosesDefaultService implements FindDiagnosesUseCase {
  constructor(
    @Inject(DIAGNOSIS_POSTGRES_REPOSITORY)
    private readonly diagnosisPersistencePort: DiagnosisPersistencePort,
  ) {}
  async execute(
    diagnosisFilters: DiagnosisFilters,
  ): Promise<PageResult<Diagnosis>> {
    return await this.diagnosisPersistencePort.findDiagnoses(diagnosisFilters);
  }
}
