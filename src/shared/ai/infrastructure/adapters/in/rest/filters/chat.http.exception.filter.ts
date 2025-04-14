import { Catch, HttpStatus } from '@nestjs/common';
import { BaseHttpExceptionFilter } from '@common/filters/base.http.exception.filter';
import { ChatException } from '@shared/ai/domain/exceptions/chat.exception';

@Catch(ChatException)
export class ChatHttpExceptionFilter extends BaseHttpExceptionFilter<ChatException> {
  protected exceptionToStatusMap: Record<string, number> = {
    ChatException: HttpStatus.FAILED_DEPENDENCY,
  };
}
