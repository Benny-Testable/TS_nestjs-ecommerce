# Backup and recovery

## Implemented in Terraform

- RDS automated backups, backup window `03:00-04:00` UTC, copy tags to snapshot.
- Production: `multi_az = true`, `deletion_protection = true`, final snapshot required.
- Staging: `skip_final_snapshot = true` to keep sandboxes cheap.

## Application

TypeORM migrations are the restore-schema path. After restoring a snapshot, run `npm run migration:run` only if restoring to a schema older than HEAD.

## Recovery objectives (targets, not measured)

- RPO: 24 hours (backup window + retention).
- RTO: 8 hours for RDS restore + ECS service recreation.

There is no automated failover test in CI. DR tests are organizational.
