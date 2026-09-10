# Data retention

See also FERPA retention notes.

| Store | Retention |
| --- | --- |
| RDS customer data | Until account deletion (no API yet) |
| RDS backups | `backup_retention_days` (default 7) |
| CloudWatch API logs | `log_retention_days` (default 90) |
| `audit_log` | Operational; indexed on `createdAt` for purge jobs |
| GitHub Actions artifacts | GitHub default |
| Terraform state | Operator-managed backend (not in git) |

Do not lower production CloudWatch retention below 30 days without a records-schedule review.
