export class CursorPaginationDto {
  cursor?: string;
  limit?: number = 10;
}

export class PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export class PaginatedResult<T> {
  data: T[];
  pageInfo: PageInfo;
}
