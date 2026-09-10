# Data minimization

Collect only `email` and `password` at registration (`CreateUserDto`). No phone, address, date of birth, or student identifier is accepted.

Inbound JSON unknown properties are stripped by `ValidationPipe({ whitelist: true })` in `configureApp`.

Outbound user payloads use `@Expose()` on `id` and `email` only. Password hashes never leave the service layer through `GET /user/profile`.

Audit rows store path and user id, not request bodies, IP addresses, or user agents, to avoid creating a second copy of education records.

Infrastructure tags resources `DataClassification = confidential` in `infra/terraform/versions.tf` for handling, not for public disclosure.
