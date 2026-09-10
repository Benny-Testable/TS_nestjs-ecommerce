# Disclosure and access procedures

These are **organizational** procedures. The API does not implement consent workflows.

1. **Annual notice** — the institution, not this repository, issues FERPA annual notification and directory-information opt-out.
2. **Record of disclosures** — if user emails are sent to a subprocessors beyond AWS (none are configured in code), log the disclosure outside this API.
3. **School official** — AWS is a subprocessors for hosting. IAM roles in `infra/terraform/iam.tf` are the technical boundary; personnel access to AWS is a process control.
4. **Health or safety emergency / court order** — handled by the institution's counsel; engineering may export a single `user` row and related `audit_log` rows on written request.
5. **Eligible student inspection** — provide `GET /user/profile` output plus a redacted audit history for that `userId`. Do not provide other users' rows.

There is no directory-information flag on `User`. Treat email as non-directory unless the institution documents otherwise.
