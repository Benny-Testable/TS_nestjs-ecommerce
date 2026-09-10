# Ecommerce App with Nest.js and Postgres

## Description
This project is an ecommerce application built using Nest.js and Postgres. The focus is on writing clean, modular, and testable code, and following a well-organized project structure.

## Technology Stack

- Nest.js 9 (Node 22)
- PostgreSQL 15 (TypeORM)
- JWT authentication with Customer / Merchant / Admin roles
- Jest
- AWS infrastructure via Terraform (`infra/terraform`)

## Architecture notes

This is a **NestJS HTTP API**, not a Next.js app. Local Postgres is `docker-compose.yml`. Staging/production shape is ECS Fargate + private RDS, documented in `infra/terraform/README.md`.

Compliance artifacts (not legal certifications):

- FERPA: `docs/compliance/ferpa/`
- SOC 2-oriented controls: `docs/compliance/soc2/`
- Security intake: `SECURITY.md`

After pulling, run `npm run migration:run` so the `audit_log` table exists.

## Getting Started

This branch requires **Node.js 22**. Use nvm or a similar version manager:

```bash
nvm install
nvm use
```

To get started with this project, follow these steps:

- Clone this repository to your local machine.
- navigate to the nestjs-ecommerce directory.

```bash 
cd ./nestjs-ecommerce
```
- start postgres database.

```bash
docker-compose up -d
```

- install app dependencies.

```bash
npm install
```

- run database migrations.

```bash
npm run migration:run
```
if you want to generate any future migration

```bash
npm run migration:generate --name=<migrationName>
```

- run database seeders.

```bash
npm run seed:run
```

- start the applictaion.

```bash
npm run start:dev
```

## Testing
To run the tests, follow these steps:
1. Install dependencies: `npm install`
2. Run the tests: `npm run test`

## Contributing
If you're interested in contributing to this project, please follow these guidelines:
1. Fork the repository
2. Make your changes
3. Submit a pull request
