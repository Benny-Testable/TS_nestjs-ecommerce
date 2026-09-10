resource "random_password" "db" {
  length  = 32
  special = false
}

resource "random_password" "jwt" {
  length  = 64
  special = false
}

resource "aws_secretsmanager_secret" "app" {
  name       = "${local.name}/app"
  kms_key_id = aws_kms_key.data.arn
}

resource "aws_secretsmanager_secret_version" "app" {
  secret_id = aws_secretsmanager_secret.app.id
  secret_string = jsonencode({
    DATABASE_HOST     = aws_db_instance.postgres.address
    DATABASE_PORT     = tostring(aws_db_instance.postgres.port)
    DATABASE_NAME     = var.db_name
    DATABASE_USER     = var.db_username
    DATABASE_PASSWORD = random_password.db.result
    JWT_SECRET        = random_password.jwt.result
  })
}
