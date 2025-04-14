import { ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '@common/dtos/exception.response';
import { BaseException } from '@common/exceptions/base.exception';
import { Response, Request } from 'express';

export abstract class BaseHttpExceptionFilter<T extends BaseException>
  implements ExceptionFilter
{
  protected abstract exceptionToStatusMap: Record<string, number>;
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const path = request.url;
    const method = request.method;
    const status: number =
      this.exceptionToStatusMap[exception.constructor.name] ??
      HttpStatus.INTERNAL_SERVER_ERROR;
    const statusDescription = HttpStatus[status] || 'Internal server error';
    const message = exception.message || 'Internal server error';
    const exceptionResponse = new ExceptionResponse({
      path,
      method,
      statusCode: status,
      statusDescription,
      timestamp: exception.timestamp,
      message,
    });
    response.status(status).json(exceptionResponse);
  }
}
