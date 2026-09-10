# Secrets management

## Local

`getEnvPath` loads `src/common/envs/<NODE_ENV>.env`. Root `.env.example` lists names only. Do not put production values in those files.

## Production

ECS task definition `secrets` pull `DATABASE_*` and `JWT_SECRET` from a single JSON Secrets Manager secret defined in `infra/terraform/secrets.tf`. The execution role may `GetSecretValue` on that ARN only.

`resolveSecret` aborts boot in production if JWT, database password, or admin password still equal the development defaults.

## CI

GitHub Actions uses `GITHUB_TOKEN`. No AWS keys are stored in workflows in this repository. Deploy credentials, if added later, must be GitHub OIDC to AWS, not static keys in git.
