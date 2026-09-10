# Encryption

| Data | In transit | At rest |
| --- | --- | --- |
| HTTPS to API | ALB TLS 1.3 policy when ACM ARN is set | n/a |
| NestJS to Postgres | `DATABASE_SSL=true`, `rejectUnauthorized: true` | RDS storage encrypted with rotated KMS key |
| JWT signing secret | ECS secrets injection (not env in git) | Secrets Manager + KMS |
| Container image | TLS to ECR | ECR KMS |
| CloudWatch logs | AWS APIs | Log group KMS key |

Passwords: bcrypt, not reversible encryption.

JWT payload contains `id` and `email` (`PayloadDto`). Treat bearer tokens as confidential.
