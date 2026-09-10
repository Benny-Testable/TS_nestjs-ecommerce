# Environment separation

| Environment | Compute | Database | Secrets |
| --- | --- | --- | --- |
| Local | `npm run start:dev` | `docker-compose` Postgres 15 on `127.0.0.1:5432` | `development.env` fixtures |
| Test | Jest | `test.env` / `ecommerceTestdb` | `test.env` fixtures |
| Staging | Terraform `environment=staging` | Single-AZ RDS, skip final snapshot | Secrets Manager `${project}-staging/app` |
| Production | Terraform `environment=prod` | Multi-AZ, deletion protection | Separate AWS account recommended |

`variable.environment` only allows `staging` or `prod`. Do not share RDS instances across these environments. Node 22 is required in all of them (`.nvmrc`, `package.json` engines, Dockerfile).
