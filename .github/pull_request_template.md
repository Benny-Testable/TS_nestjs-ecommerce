## Change request

- [ ] Purpose of the change is described
- [ ] Secrets, credentials, and production hostnames are not included
- [ ] Database schema changes include a TypeORM migration
- [ ] New access paths have `@Auth(...)` role checks where required
- [ ] Audit logging still records the request path without bodies or tokens

## Risk

- Data classification affected: `public` / `internal` / `confidential` / `education-record`
- Rollback plan:

## Verification

- [ ] `npm test`
- [ ] `npx eslint "{src,apps,libs,test}/**/*.ts"`
- [ ] `npm run build`
