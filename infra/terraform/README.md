# Infrastructure as Code for nestjs-ecommerce
#
# Provisions an AWS environment that matches this NestJS 9 API:
# - Node 22 container (see package.json engines and Dockerfile)
# - PostgreSQL 15 (see docker-compose.yml and TypeORM dataSourceOptions)
# - JWT_SECRET, DATABASE_* injected from Secrets Manager (see src/config/index.ts)
# - /health used by the load balancer (see src/app.controller.ts)
#
# This directory does not store credentials. Copy terraform.tfvars.example to
# terraform.tfvars (gitignored) and authenticate with AWS SSO or instance roles.

## Prerequisites

- Terraform >= 1.6
- AWS credentials with permission to create VPC, ECS, RDS, IAM, KMS, WAF, and Secrets Manager resources
- Docker, to build and push the API image

## Apply

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

After apply, build and push the API image, then run database migrations from a
network path that can reach RDS (for example a one-off ECS task):

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ecr_repository_url>
docker build -t nestjs-ecommerce:local ../..
docker tag nestjs-ecommerce:local <ecr_repository_url>:<git-sha>
docker push <ecr_repository_url>:<git-sha>
```

Set `image_tag` to that git SHA (the ECR repository is immutable).

Then:

```bash
NODE_ENV=production npm run migration:run
```

## Network and data flow

1. Clients reach the Application Load Balancer on HTTPS 443.
2. AWS WAF rate-limits abusive IPs before traffic reaches ECS.
3. ECS Fargate tasks run `node dist/main` on port 3000.
4. Tasks connect to private RDS PostgreSQL 15 on 5432 using TLS (`DATABASE_SSL=true`).
5. Audit events written by `AuditInterceptor` go to Postgres `audit_log` and CloudWatch via stdout.

## Environment separation

Use a separate Terraform workspace or AWS account per `environment` (`staging` vs `prod`). Production sets `deletion_protection` and Multi-AZ on RDS.

Local development continues to use `docker-compose.yml` bound to `127.0.0.1:5432`. Do not point local `.env` files at this RDS instance.

## Secrets

Terraform generates `DATABASE_PASSWORD` and `JWT_SECRET` with the `random` provider and stores them in Secrets Manager. They are never written to git. Rotate by replacing the secret version and forcing a new ECS deployment.

## TLS

Set `acm_certificate_arn` to a validated ACM certificate so the ALB listens on HTTPS 443 and HTTP 80 redirects. Leave it empty only for sandboxes; the example tfvars file does that so `terraform apply` can run without DNS validation.
