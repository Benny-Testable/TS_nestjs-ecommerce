# FERPA

**Status:** This repository documents controls relevant to FERPA. It does **not** assert that the application or operating organization is FERPA compliant.

This API (`nestjs-ecommerce`) stores merchant/customer accounts (`user.email`, bcrypt `user.password`, `user_roles`) and commerce data. FERPA applies to educational agencies and institutions that receive US Department of Education funds, and to vendors they designate as school officials, when they maintain **education records**.

If a school uses this API as a campus store or licensed vendor:

| Data in this schema | Likely classification if linked to a student |
| --- | --- |
| `user.id`, `user.email` | Education record / PII |
| `user.password` (hash) | Authentication secret, not directory information |
| `user.createdAt` | Education record metadata |
| `role` / `user_roles` | Access-control data |
| Product, inventory, price | Generally not education records unless tied to a student account in a school context |

There are no student-ID, grade, IEP, or disciplinary fields in the current TypeORM entities. Do not add those fields without a documented purpose, minimization review, and access-control change.

## Implemented vs process

| Topic | In this repository | Requires operating process |
| --- | --- | --- |
| Authentication | JWT + bcrypt | Account lifecycle at the school |
| Authorization | `@Auth(RoleIds.*)` | Who may be Admin/Merchant |
| Audit of API access | `audit_log` + CloudWatch | Review of logs, DSAR handling |
| Encryption in transit/at rest | Terraform TLS/RDS/KMS | Certificate operations |
| Disclosure to third parties | Documented only | Written agreements, record of disclosures |
| Parent / eligible student rights | Documented only | Registrar procedures |

See the documents in this directory and `implementation-mapping.md`.
