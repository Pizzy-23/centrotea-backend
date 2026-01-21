import { CursorPaginationDto, PaginatedResult } from '../dtos/pagination.dto';

export class CursorPaginationHelper {
  static encodeCursor(id: string): string {
    return Buffer.from(id).toString('base64');
  }

  static decodeCursor(cursor: string): string {
    return Buffer.from(cursor, 'base64').toString('utf8');
  }

  static async paginate<T>(
    queryBuilder: any,
    options: CursorPaginationDto,
    idField: string = 'id',
  ): Promise<PaginatedResult<T>> {
    const limit = options.limit || 10;
    const cursor = options.cursor;

    if (cursor) {
      const decodedId = this.decodeCursor(cursor);
      queryBuilder.andWhere(`${idField} > :decodedId`, { decodedId });
    }

    queryBuilder.take(limit + 1);
    queryBuilder.orderBy(idField, 'ASC');

    const results = await queryBuilder.getMany();
    const hasNextPage = results.length > limit;
    const data = hasNextPage ? results.slice(0, limit) : results;

    const endCursor = hasNextPage 
      ? this.encodeCursor(String(data[data.length - 1][idField.split('.').pop() as keyof T])) 
      : undefined;

    return {
      data,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }
}
