# Password policy (security tree)

See `docs/compliance/soc2/password-security-policy.md`. API passwords are bcrypt-hashed in `UserService.createUser`. Production secrets are rejected if they still use development defaults (`src/common/security/secrets.ts`).
