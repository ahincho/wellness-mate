export class PageResult<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  items: T[];
  constructor(partial?: Partial<PageResult<T>>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
