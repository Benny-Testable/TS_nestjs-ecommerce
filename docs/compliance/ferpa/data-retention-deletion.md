# Retention and deletion

## Application

| Record | Default retention | Deletion |
| --- | --- | --- |
| `user` | For the life of the account | Hard delete of the row (no dedicated erasure endpoint yet) |
| `audit_log` | 90 days recommended | Operational job; table is append-only |
| CloudWatch `/ecs/nestjs-ecommerce-*` | `log_retention_days` (default 90) | AWS expire |
| RDS automated backups | `backup_retention_days` (default 7) | AWS expire |

## Process required

FERPA does not set a single retention period; the institution's records schedule does. This API does **not** currently expose a self-service "delete my education records" endpoint. Fulfilling a deletion request requires an Admin operating on the database or a future `DELETE /user/profile` that is not implemented.

Do not keep extra CSV exports of `user.email` on laptops. Staging and production AWS accounts must be separate (`docs/compliance/soc2/environment-separation.md`).
