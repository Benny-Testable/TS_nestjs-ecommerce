data "aws_iam_policy_document" "kms" {
  statement {
    sid = "EnableRootAccount"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions   = ["kms:*"]
    resources = ["*"]
  }

  statement {
    sid = "AllowAwsDataServices"
    principals {
      type = "Service"
      identifiers = [
        "logs.${var.aws_region}.amazonaws.com",
        "rds.amazonaws.com",
        "secretsmanager.${var.aws_region}.amazonaws.com",
        "ecr.amazonaws.com"
      ]
    }
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:DescribeKey",
      "kms:CreateGrant"
    ]
    resources = ["*"]
  }
}

resource "aws_kms_key" "data" {
  description             = "Encrypts RDS, Secrets Manager, and CloudWatch logs for ${local.name}"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  policy                  = data.aws_iam_policy_document.kms.json
}

resource "aws_kms_alias" "data" {
  name          = "alias/${local.name}-data"
  target_key_id = aws_kms_key.data.id
}
