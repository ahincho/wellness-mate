import { Catch, HttpStatus } from '@nestjs/common';
import { BaseHttpExceptionFilter } from '@common/filters/base.http.exception.filter';
import { RoleNotFoundException } from '@users/domain/exceptions/role.not.found.exception';
import { UserDuplicationException } from '@users/domain/exceptions/user.duplication.exception';
import { UserNotFoundException } from '@users/domain/exceptions/user.not.found.exception';

@Catch(UserDuplicationException, UserNotFoundException, RoleNotFoundException)
export class UserHttpExceptionFilter extends BaseHttpExceptionFilter<
  UserDuplicationException | UserNotFoundException | RoleNotFoundException
> {
  protected exceptionToStatusMap: Record<string, number> = {
    UserDuplicateException: HttpStatus.CONFLICT,
    UserNotFoundException: HttpStatus.NOT_FOUND,
    RoleNotFoundException: HttpStatus.FAILED_DEPENDENCY,
  };
}
