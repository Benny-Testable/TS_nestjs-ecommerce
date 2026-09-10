# Logging and monitoring

| Signal | Where |
| --- | --- |
| HTTP access / audit | `audit_log` + stdout JSON from `AuditService` |
| Application errors | `ErrorsFilter` uses `Logger.error`; 500s do not echo stack traces to clients |
| RDS logs | `enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]` |
| Load balancer | ALB access logs are not enabled in Terraform yet (gap) |
| WAF | Sampled requests and CloudWatch metrics |
| ECS | Container Insights enabled |

Production SQL query logging is disabled (`DATABASE_LOGGING=false`) so statement text with emails is not copied into CloudWatch.

No paging integration (PagerDuty/Opsgenie) is defined in this repository.
