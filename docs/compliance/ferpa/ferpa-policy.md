# FERPA policy (organizational)

Applies when an educational institution designates the operator of this API as a school official with a legitimate educational interest, or when the institution itself runs the API.

1. Education records are not disclosed to third parties except as FERPA permits (school official, directory information after notice and opt-out, health/safety emergency, judicial order, or written consent).
2. The operator does not use education records for targeted advertising.
3. Subprocessors (AWS regions used by `infra/terraform`) are listed in `docs/compliance/soc2/vendor-third-party-risk.md`.
4. Requests from parents or eligible students are fulfilled by the institution's registrar; this API can support lookup by `user.id` / `user.email` and deletion of the `user` row plus related products the user owns.
5. This policy is not legal advice and does not replace institutional FERPA training or annual notification.
