import { PageResponse } from '@common/dtos/page.response';
import { PageResult } from '@common/models/page.result';

export class PageMapper {
  static transformItems<T, R>(
    page: PageResult<T>,
    itemMapper: (item: T) => R,
  ): PageResponse<R> {
    return new PageResponse<R>({
      totalItems: page.totalItems,
      totalPages: page.totalPages,
      currentPage: page.currentPage,
      pageSize: page.pageSize,
      hasNextPage: page.hasNextPage,
      items: page.items.map(itemMapper),
    });
  }
}
