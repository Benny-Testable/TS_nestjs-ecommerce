# Infrastructure

Production and staging AWS resources for this NestJS API are defined as Terraform under `terraform/`.

Local PostgreSQL remains `docker-compose.yml` at the repository root (Postgres 15, bound to localhost).
