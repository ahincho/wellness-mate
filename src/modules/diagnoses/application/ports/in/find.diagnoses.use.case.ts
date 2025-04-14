import { PageResult } from '@common/models/page.result';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';
import { DiagnosisFilters } from '@diagnoses/domain/models/diagnosis.filters';

export interface FindDiagnosesUseCase {
  execute(diagnosisFilters: DiagnosisFilters): Promise<PageResult<Diagnosis>>;
}
