# FERPA technical safeguards

| Safeguard | Implementation |
| --- | --- |
| Unique logins | Email + bcrypt password, JWT bearer token |
| Session bound | JWT `expiresIn: 3h`; no refresh-token store |
| Authorization | `AuthGuard` + `RolesGuard` |
| Encryption in transit | ALB HTTPS when `acm_certificate_arn` is set; RDS `DATABASE_SSL=true` |
| Encryption at rest | RDS `storage_encrypted`, KMS rotation, ECR KMS, Secrets Manager KMS |
| Network isolation | Private subnets for RDS; ECS SG only from ALB; RDS SG only from ECS |
| Input validation | class-validator DTOs + whitelist ValidationPipe |
| Security headers | `applySecurityHeaders` |
| Secret defaults blocked | `resolveSecret` throws in `NODE_ENV=production` |
| Dependency scanning | `.github/workflows/security.yml` `npm audit` |
| Image scanning | ECR `scan_on_push` |
| Rate limiting | AWS WAF IP rate limit on the ALB |

Physical safeguards (data center access) are provided by AWS under the shared responsibility model and are not implemented in this repository.
