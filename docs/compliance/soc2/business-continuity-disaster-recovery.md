# Business continuity and disaster recovery

The production shape is a single AWS region (`var.aws_region`). Regional loss is recovered by:

1. Recreating the stack with Terraform in a second region (not pre-provisioned).
2. Restoring the latest RDS snapshot (cross-region copy is not enabled here).
3. Pointing DNS at the new ALB.

Local development (`docker-compose.yml`) is not a DR environment.

Dependencies that must remain available: GitHub (source), AWS (compute/data), npm (builds). There is no offline build cache in this repo.

This document is a plan, not evidence that DR has been tested.
