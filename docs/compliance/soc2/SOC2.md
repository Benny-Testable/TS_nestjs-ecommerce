# SOC 2 control documentation

These documents support a SOC 2 Type I/II evaluation of **nestjs-ecommerce**. They are not a SOC 2 report and do not replace an independent auditor.

Trust Services Criteria touched by this repository:

- **CC6** Logical access — JWT, roles, IAM, security groups, secrets
- **CC7** System operations — CloudWatch, audit_log, WAF, ECR scanning
- **CC8** Change management — GitHub CODEOWNERS, PR template, CI
- **A1** Availability — Multi-AZ optional, RDS backups, ECS desired count
- **C1** Confidentiality — KMS, TLS, serialization, secret defaults blocked

See `control-implementation-mapping.md` for a file-level map.
