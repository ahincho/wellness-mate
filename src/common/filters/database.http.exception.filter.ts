import { Catch, HttpStatus } from '@nestjs/common';
import { DatabaseException } from '@common/exceptions/database.exception';
import { BaseHttpExceptionFilter } from './base.http.exception.filter';

@Catch(DatabaseException)
export class DatabaseHttpExceptionFilter extends BaseHttpExceptionFilter<DatabaseException> {
  protected exceptionToStatusMap: Record<string, number> = {
    DatabaseException: HttpStatus.FAILED_DEPENDENCY,
  };
}
