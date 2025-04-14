import { Diagnosis } from '@diagnoses/domain/models/diagnosis';

export class DiagnosisResponse {
  id: number;
  content: string;
  createdAt: Date;
  constructor(partial?: Partial<Diagnosis>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
