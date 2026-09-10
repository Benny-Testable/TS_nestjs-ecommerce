# Student education-record handling

## System of record

TypeORM entity `User` (`src/database/entities/user.entity.ts`) is the only table that stores end-user identity. Passwords are bcrypt hashes (cost 10) in `UserService.createUser`. Profiles returned to clients use `UserDto`, which exposes `id` and `email` only (`src/api/user/dto/user.dto.ts` + `Serialize` interceptor).

## Handling rules

1. Treat `email` as potentially an education record when the tenant is an educational institution.
2. Do not log passwords, JWT values, or `Authorization` headers. `AuditInterceptor` records method, path, user id, status, and duration only.
3. Do not copy user rows into product JSON or client error messages.
4. Database query logging is off unless `DATABASE_LOGGING=true` (local development). Production ECS sets `DATABASE_LOGGING=false` in `infra/terraform/ecs.tf`.
5. Direct SQL access is limited to the ECS task security group (`infra/terraform/security-groups.tf`). There is no public RDS endpoint.

## Not in scope of current schema

Grades, transcripts, student ID numbers, date of birth, and parent contacts are not stored. Adding them is a schema change that requires a FERPA review, a TypeORM migration, and tighter `@Auth` rules than the current Customer role.
