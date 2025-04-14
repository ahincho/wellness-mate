import { Optional } from '@common/models/optional';
import { PageResult } from '@common/models/page.result';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisFilters } from '@diagnoses/domain/models/diagnosis.filters';

export interface DiagnosisPersistencePort {
  createOneDiagnosis(diagnosis: Diagnosis): Promise<Diagnosis>;
  findDiagnoses(
    diagnosisFilters: DiagnosisFilters,
  ): Promise<PageResult<Diagnosis>>;
  findOneDiagnosis(diagnosisId: number): Promise<Optional<Diagnosis>>;
}
