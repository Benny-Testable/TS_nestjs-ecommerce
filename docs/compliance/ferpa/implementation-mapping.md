# FERPA implementation mapping

| Requirement | Code / config | Documented process |
| --- | --- | --- |
| Identify education records | `user` entity; no grade/SIS fields | `education-records-handling.md` |
| Authenticate requesters | `AuthGuard`, `JwtModule`, bcrypt | Password policy in SOC 2 |
| Authorize by role | `@Auth(RoleIds.Admin, RoleIds.Merchant)` | Access-control.md |
| Minimize fields | `UserDto` + ValidationPipe whitelist | data-minimization.md |
| Audit access | `AuditInterceptor`, `audit_log` migration | audit-logging.md |
| Encrypt | Terraform KMS/RDS/TLS; `DATABASE_SSL` | technical-safeguards.md |
| Retain / delete | RDS backup retention variable; no DSAR API | data-retention-deletion.md |
| Disclose | None in application code | disclosure-procedures.md |
| Incident | Security workflow + IR policy | incident-response.md |

If a control is only in the "Documented process" column, scanners should treat it as policy evidence, not as a runtime guarantee.
