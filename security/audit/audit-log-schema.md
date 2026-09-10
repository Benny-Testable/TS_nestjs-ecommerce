# Audit log schema

Table `audit_log` is created by `src/database/migration/history/1757462400000-audit-log.ts` and mapped by `src/database/entities/auditLog.entity.ts`.

| Column | Purpose |
| --- | --- |
| userId | JWT subject when present; null for login failures and public routes |
| method | HTTP method |
| path | Path without query string |
| statusCode | HTTP status |
| durationMs | Handler duration |
| createdAt | Insert timestamp |

Bodies, headers, and IP addresses are intentionally omitted. Writers: `AuditService`. CI does not connect to production `audit_log`.
