# Data classification

| Label | Examples in this API | Handling |
| --- | --- | --- |
| Public | Product catalog fields returned by `GET /product/:id` | No auth today |
| Internal | Role names, Terraform state (not in git), CI logs | Restrict GitHub and AWS IAM |
| Confidential | `user.email`, bcrypt hashes, JWT secret, RDS credentials | Secrets Manager, TLS, role checks |
| Education record (conditional) | `user.email` when the tenant is a school | FERPA procedures in this folder |

Production Terraform tags resources `DataClassification = confidential`. That tag is a handling hint, not a FERPA determination.
