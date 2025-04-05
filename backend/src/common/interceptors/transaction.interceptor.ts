import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransactionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    // For blockchain transactions, we want to log the request and response
    if (url.includes('/blockchain') || body?.transaction) {
      const now = Date.now();
      
      return next.handle().pipe(
        tap({
          next: (data) => {
            const response = context.switchToHttp().getResponse();
            this.logger.log(
              ${method}   ms,
              data?.signature ? Transaction signature:  : '',
            );
          },
          error: (error) => {
            this.logger.error(
              ${method}  ms,
              error.message,
            );
          },
        }),
      );
    }
    
    return next.handle();
  }
}
