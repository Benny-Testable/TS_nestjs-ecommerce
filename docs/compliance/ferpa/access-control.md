# FERPA access control

## Application roles

`RoleIds` in `src/api/role/enum/role.enum.ts`:

| Role | ID | Education-record access in this API |
| --- | --- | --- |
| Customer | 1 | Own profile via `GET /user/profile` (`@Auth()` with no extra roles) |
| Merchant | 2 | Product APIs they own; not other users' profiles |
| Admin | 3 | Role assignment (`POST /role/assign`) and product administration |

JWT verification is in `AuthGuard` (`src/api/auth/guards/auth.guard.ts`). Role enforcement is in `RolesGuard`. Tokens expire after 3 hours (`AuthModule` `signOptions.expiresIn`).

## Legitimate educational interest (process)

Only school officials with a documented need may receive Admin credentials. That assignment is an organizational control; the API only knows role IDs stored in `user_roles`.

## Gaps (honest)

- There is no object-level check that a Customer can read only their own row beyond using `CurrentUser()` from the JWT. `UserService.findById` will return any id if called with that id.
- `GET /product/:id` is unauthenticated. Product catalog data is not treated as an education record.
- There is no step-up authentication or session revocation list.
