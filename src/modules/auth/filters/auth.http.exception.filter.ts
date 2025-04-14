import { Catch, HttpStatus } from '@nestjs/common';
import { BaseHttpExceptionFilter } from '@common/filters/base.http.exception.filter';
import { AuthException } from '@auth/exceptions/auth.exception';
import { CredentialException } from '@auth/exceptions/credential.exception';

@Catch(AuthException, CredentialException)
export class AuthHttpExceptionFilter extends BaseHttpExceptionFilter<
  AuthException | CredentialException
> {
  protected exceptionToStatusMap: Record<string, number> = {
    AuthException: HttpStatus.BAD_REQUEST,
    CredentialException: HttpStatus.FORBIDDEN,
  };
}
