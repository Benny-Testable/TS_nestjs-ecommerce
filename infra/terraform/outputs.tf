output "vpc_id" {
  description = "VPC that hosts the NestJS API and PostgreSQL."
  value       = aws_vpc.this.id
}

output "alb_dns_name" {
  description = "Public DNS name of the HTTPS load balancer."
  value       = aws_lb.api.dns_name
}

output "ecr_repository_url" {
  description = "Push target for the NestJS container image built from the repository Dockerfile."
  value       = aws_ecr_repository.api.repository_url
}

output "rds_endpoint" {
  description = "Private PostgreSQL hostname used as DATABASE_HOST."
  value       = aws_db_instance.postgres.address
}

output "rds_database_name" {
  description = "PostgreSQL database name matching TypeORM DATABASE_NAME."
  value       = aws_db_instance.postgres.db_name
}

output "secrets_manager_arn" {
  description = "ARN of the JSON secret injected into the ECS task (JWT_SECRET and database credentials)."
  value       = aws_secretsmanager_secret.app.arn
}

output "cloudwatch_log_group" {
  description = "Log group that receives NestJS application and audit-log stdout."
  value       = aws_cloudwatch_log_group.api.name
}

output "ecs_cluster_name" {
  description = "ECS cluster running the API."
  value       = aws_ecs_cluster.this.name
}
