import { Page } from '@common/models/page';

export class DiagnosisFilters {
  page: Page;
  patientId: number;
  constructor(partial?: Partial<DiagnosisFilters>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
