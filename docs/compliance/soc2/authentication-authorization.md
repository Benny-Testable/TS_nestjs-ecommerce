# Authentication and authorization

## Authentication

`POST /auth/login` verifies email + bcrypt hash and returns a JWT signed with `JWT_SECRET` (`AuthService`, `JwtModule`). Production refuses default secrets (`resolveSecret`).

## Authorization

`Auth(...roleIds)` sets metadata and applies `AuthGuard` then `RolesGuard`. Missing or expired tokens yield 401. Wrong role yields 401 with `notAllowed`.

## Passwords

Hashed with bcrypt cost 10. `UserDto` never exposes the hash. Login errors do not distinguish unknown user vs wrong password (`wronCredentials`).

## Gaps

No MFA, no refresh-token rotation, no lockout after failed logins (WAF rate limit is IP-based, not account-based), no password-complexity regex on `CreateUserDto` (only non-empty string). Those are documented limitations, not hidden.
