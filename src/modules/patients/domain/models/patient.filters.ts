import { Page } from '@common/models/page';

export class PatientFilters {
  page: Page;
  constructor(partial?: Partial<PatientFilters>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
