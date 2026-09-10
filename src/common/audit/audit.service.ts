import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from 'src/database/entities/auditLog.entity';
import { Repository } from 'typeorm';

export type AuditEvent = {
  userId: number | null;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
};

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async record(event: AuditEvent): Promise<void> {
    this.logger.log(
      JSON.stringify({
        event: 'http_access',
        ...event,
      }),
    );

    try {
      await this.repository.save(this.repository.create(event));
    } catch (error) {
      this.logger.warn(
        `audit_log persist failed: ${
          error instanceof Error ? error.message : 'unknown error'
        }`,
      );
    }
  }
}
