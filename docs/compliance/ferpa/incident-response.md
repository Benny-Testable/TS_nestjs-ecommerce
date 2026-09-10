# FERPA incident / breach response

Follow `docs/compliance/soc2/incident-response-policy.md` with these additions when education records may be involved:

1. Assume `user.email` lists are education records until counsel says otherwise.
2. Notify the contracting educational institution without unreasonable delay so that institution can meet its FERPA and state breach-notice duties.
3. Rotate `JWT_SECRET` (Secrets Manager + ECS redeploy) if tokens may have leaked.
4. Preserve `audit_log` and CloudWatch streams before shrinking retention.
5. This application has no built-in user notification mailer; notification is an operational process.
