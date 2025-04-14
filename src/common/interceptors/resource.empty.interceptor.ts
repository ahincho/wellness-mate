import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class ResourceEmptyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap((data) => {
        if (data?.items?.length === 0) {
          response.status(204).send();
        }
      }),
      map((data) => {
        return data?.items?.length === 0 ? undefined : data;
      }),
    );
  }
}
