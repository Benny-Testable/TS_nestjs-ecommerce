# SOC 2 control implementation mapping

| Criterion (typical) | Artifact | Implemented | Documented |
| --- | --- | --- | --- |
| CC6.1 logical access | `AuthGuard`, `RolesGuard`, IAM roles, SGs | Yes | access-control-policy.md |
| CC6.6 secrets | Secrets Manager, `resolveSecret` | Yes | secrets-management.md |
| CC6.7 encryption | KMS, RDS, TLS, bcrypt | Yes | encryption-policy.md |
| CC7.2 monitoring | Audit interceptor, CloudWatch, WAF | Partial (no ALB access logs, no paging) | logging-monitoring-policy.md |
| CC8.1 change mgmt | CI, CODEOWNERS, PR template, migrations | Yes | change-management-policy.md |
| CC7.1 vuln mgmt | npm audit workflow, Dependabot, ECR scan | Yes (findings may remain) | vulnerability-management-policy.md |
| A1.2 backups | RDS backup retention | Yes | backup-recovery-policy.md |
| A1.3 DR | Regional rebuild plan | Plan only | business-continuity-disaster-recovery.md |
| Vendor risk | AWS/GitHub/npm inventory | Inventory only | vendor-third-party-risk.md |
