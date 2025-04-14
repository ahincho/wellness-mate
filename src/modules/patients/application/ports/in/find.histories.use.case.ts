import { PageResult } from '@common/models/page.result';
import { History } from '@patients/domain/models/history';
import { HistoryFilters } from '@patients/domain/models/history.filters';

export interface FindHistoriesUseCase {
  execute(historyFilters: HistoryFilters): Promise<PageResult<History>>;
}
