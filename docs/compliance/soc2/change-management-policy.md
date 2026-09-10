# Change management

1. Changes land through pull requests. `.github/pull_request_template.md` requires purpose, risk, and test evidence.
2. `.github/CODEOWNERS` requires review on authentication, audit, infrastructure, and compliance paths.
3. `.github/workflows/ci.yml` runs eslint, unit tests, and `nest build` on Node 22 (`.nvmrc`).
4. Database changes require a TypeORM migration under `src/database/migration/history/`. `synchronize` is false.
5. Infrastructure changes are Terraform plans reviewed in the same PR as `infra/terraform/**`.
6. Production deploys are image-tag immutable (`image_tag_mutability = "IMMUTABLE"`).

Emergency changes still require a follow-up PR. There is no separate production console workflow in this repo.
