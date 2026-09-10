# Access control policy

## Human access

- GitHub: repository permissions plus `.github/CODEOWNERS` for auth, audit, infra, and compliance paths.
- AWS: no long-lived keys in git. Terraform uses the caller identity. ECS tasks use dedicated execution and task roles (`infra/terraform/iam.tf`).

## Application access

- Unauthenticated: `GET /`, `GET /health`, `POST /auth/login`, `POST /auth/register`, `GET /product/:id`.
- Authenticated any role: `GET /user/profile`.
- Merchant or Admin: product create/update/activate/delete.
- Admin: `POST /role/assign`.

Anonymous product read is an application product decision, not a SOC 2 defect, but it must stay free of user PII.

Joiner/mover/leaver for AWS and GitHub is an **organizational** control not implemented in this API.
