import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          this.capture(request, response.statusCode, started);
        },
        error: (error) => {
          const statusCode = error?.status || error?.statusCode || 500;
          this.capture(request, statusCode, started);
        },
      }),
    );
  }

  private capture(
    request: {
      method?: string;
      path?: string;
      originalUrl?: string;
      user?: { id?: number };
    },
    statusCode: number,
    started: number,
  ): void {
    const path = (request.path || request.originalUrl || '').split('?')[0];

    void this.auditService.record({
      userId: request.user?.id ?? null,
      method: request.method || 'UNKNOWN',
      path,
      statusCode,
      durationMs: Date.now() - started,
    });
  }
}
