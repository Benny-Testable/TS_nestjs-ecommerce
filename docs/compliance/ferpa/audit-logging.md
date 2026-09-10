# FERPA audit logging

## Implemented

`AuditModule` registers `AuditInterceptor` for every HTTP request handled by `ApiModule`.

Persisted fields (`audit_log`): `userId`, `method`, `path` (query string stripped), `statusCode`, `durationMs`, `createdAt`.

Stdout JSON (`event=http_access`) is shipped to CloudWatch by the ECS task definition. CloudWatch retention is set in Terraform.

Failed logins (`POST /auth/login` 401) are captured because the interceptor records errors. Tokens and passwords are not written.

## Process required

- Weekly review of Admin (`RoleIds.Admin`) activity on `/role/assign`.
- Alerting on CloudWatch metric filters is not defined in Terraform yet; creating those alarms is an operational follow-up.
- `audit_log` is not tamper-evident (no WORM). RDS snapshots provide recovery, not non-repudiation against a DBA.
