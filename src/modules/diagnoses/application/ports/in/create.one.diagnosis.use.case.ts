import { Page } from '@common/models/page';
import { Diagnosis } from '@diagnoses/domain/models/diagnosis';

export interface CreateOneDiagnosisUseCase {
  execute(patientId: number, page: Page): Promise<Diagnosis>;
}
