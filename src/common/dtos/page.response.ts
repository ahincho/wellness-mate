import { ApiProperty } from '@nestjs/swagger';

export class PageResponse<T> {
  @ApiProperty({
    description: 'Total number of items in the dataset',
    example: 125,
  })
  totalItems: number;
  @ApiProperty({
    description: 'Total number of pages available',
    example: 13,
  })
  totalPages: number;
  @ApiProperty({
    description: 'Current page number (0-based index)',
    example: 2,
  })
  currentPage: number;
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  pageSize: number;
  @ApiProperty({
    description: 'Indicates if there is a next page available',
    example: true,
  })
  hasNextPage: boolean;
  @ApiProperty({
    description: 'List of items returned in the current page',
    isArray: true,
  })
  items: T[];
  constructor(partial?: Partial<PageResponse<T>>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
