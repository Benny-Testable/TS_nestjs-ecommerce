import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditLog } from 'src/database/entities/auditLog.entity';
import { AuditService } from './audit.service';

describe('AuditService', () => {
  let service: AuditService;
  const save = jest.fn();
  const create = jest.fn((value) => value);

  beforeEach(async () => {
    save.mockReset();
    create.mockClear();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: { save, create },
        },
      ],
    }).compile();

    service = module.get(AuditService);
  });

  it('persists access events without request bodies', async () => {
    await service.record({
      userId: 12,
      method: 'GET',
      path: '/user/profile',
      statusCode: 200,
      durationMs: 8,
    });

    expect(create).toHaveBeenCalledWith({
      userId: 12,
      method: 'GET',
      path: '/user/profile',
      statusCode: 200,
      durationMs: 8,
    });
    expect(save).toHaveBeenCalled();
  });

  it('does not throw when persistence fails', async () => {
    save.mockRejectedValue(new Error('relation audit_log does not exist'));
    await expect(
      service.record({
        userId: null,
        method: 'POST',
        path: '/auth/login',
        statusCode: 401,
        durationMs: 3,
      }),
    ).resolves.toBeUndefined();
  });
});
