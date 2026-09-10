variable "aws_region" {
  description = "AWS region for the NestJS API, RDS PostgreSQL, and supporting services."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short name used for resource naming. Matches the npm package name."
  type        = string
  default     = "nestjs-ecommerce"
}

variable "environment" {
  description = "Deployment environment. Use distinct AWS accounts for staging and production when possible."
  type        = string
  default     = "staging"

  validation {
    condition     = contains(["staging", "prod"], var.environment)
    error_message = "environment must be staging or prod."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for the application VPC."
  type        = string
  default     = "10.40.0.0/16"
}

variable "enable_nat_gateway" {
  description = "When true, ECS tasks run in private subnets behind a NAT gateway. Disable only for low-cost sandboxes."
  type        = bool
  default     = true
}

variable "container_port" {
  description = "NestJS listen port from src/main.ts and process.env.PORT."
  type        = number
  default     = 3000
}

variable "desired_count" {
  description = "Number of ECS tasks for the API."
  type        = number
  default     = 2
}

variable "cpu" {
  description = "Fargate task CPU units."
  type        = number
  default     = 512
}

variable "memory" {
  description = "Fargate task memory in MiB."
  type        = number
  default     = 1024
}

variable "db_name" {
  description = "PostgreSQL database name. Must match DATABASE_NAME / init.sql (ecommercedb)."
  type        = string
  default     = "ecommercedb"
}

variable "db_username" {
  description = "Application database user. Do not reuse the local docker-compose superuser in production."
  type        = string
  default     = "ecommerce_app"
}

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage in GiB."
  type        = number
  default     = 20
}

variable "backup_retention_days" {
  description = "RDS automated backup retention. SOC 2 backup control."
  type        = number
  default     = 7
}

variable "image_tag" {
  description = "ECR image tag for the NestJS API container."
  type        = string
  default     = "latest"
}

variable "cors_origin" {
  description = "Comma-separated browser origins allowed by Nest CORS (CORS_ORIGIN)."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "Optional ACM certificate ARN. When empty, the ALB listens on HTTP 80 for sandbox use only."
  type        = string
  default     = ""
}

variable "log_retention_days" {
  description = "CloudWatch log retention for API and audit stdout."
  type        = number
  default     = 90
}

