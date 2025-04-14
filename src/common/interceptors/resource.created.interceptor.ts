import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ResourceCreatedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((data: any) => {
        const location = `${request.protocol}://${request.get('host')}${request.url}/${data.id}`;
        response.setHeader('Location', location);
        response.status(HttpStatus.CREATED);
        return data;
      }),
    );
  }
}
