# Security incident response

## Severity

| Sev | Example | Initial response |
| --- | --- | --- |
| 1 | Confirmed exfiltration of `user.email` or JWT secret | Contain, rotate secrets, notify counsel / school |
| 2 | Auth bypass or RDS exposed | Disable ALB listener or scale ECS to 0 if needed |
| 3 | Dependency CVE without known exploit | Dependabot / Nest upgrade plan |

## Technical evidence available

- `audit_log` table
- CloudWatch log group `/ecs/<project>-<env>`
- GitHub Actions security workflow artifacts (`npm-audit.json`)
- AWS CloudTrail (account-level, not defined in this Terraform)

## Process

On-call, customer notification, and tabletop exercises are organizational. This repository provides `SECURITY.md` as the intake path.
