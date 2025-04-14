import { Diagnosis } from '@diagnoses/domain/models/diagnosis';

export interface FindOneDiagnosisUseCase {
  execute(diagnosisId: number): Promise<Diagnosis>;
}
