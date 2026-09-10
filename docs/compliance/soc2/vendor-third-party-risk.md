# Vendor and third-party risk

| Vendor | Use in this project | Data shared |
| --- | --- | --- |
| Amazon Web Services | VPC, ECS, RDS, KMS, Secrets Manager, WAF, CloudWatch, ECR | User emails at rest in RDS; secrets; logs |
| GitHub | Source, Actions, Dependabot, CODEOWNERS | Source code; CI logs; no production DB |
| npm registry | Dependencies | Package names/versions |
| Docker Hub / ECR public base | `node:22-alpine` | None of our customer data |

No Stripe, sendgrid, or analytics SDK is present in `package.json`. Adding a vendor requires an update to this list and a review of whether education records would flow there (FERPA school-official analysis).

AWS shared-responsibility: we configure encryption, IAM, and networking; AWS operates the data centers.
