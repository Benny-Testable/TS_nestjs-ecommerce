# Security

Report vulnerabilities privately to the repository maintainers. Do not open a public issue for credential leaks, authentication bypasses, or access to `user` rows.

## Implemented technical controls

| Control | Location |
| --- | --- |
| JWT authentication and role checks | `src/api/auth/guards/` |
| Password hashing (bcrypt, cost 10) | `src/api/user/services/user.service.ts` |
| Response serialization (password stripped) | `src/common/helper/serialize.interceptor.ts`, `UserDto` |
| Security headers | `src/common/security/security-headers.ts` |
| Production secret rejection | `src/common/security/secrets.ts` |
| HTTP audit trail | `src/common/audit/` |
| Dependency and secret scanning | `.github/workflows/security.yml` |
| Encrypted RDS, KMS, private subnets | `infra/terraform/` |

## Secrets

Never commit `JWT_SECRET`, `DATABASE_PASSWORD`, or `ADMIN_PASSWORD` for shared environments. Local placeholders live in `src/common/envs/*.env` and must not be used in production. Production values are injected from AWS Secrets Manager (`infra/terraform/secrets.tf`).

See `docs/compliance/soc2/` for the control catalog.
