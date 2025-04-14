import { Page } from '@common/models/page';

export class HistoryFilters {
  page: Page;
  patientId: number;
  constructor(partial?: Partial<HistoryFilters>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
