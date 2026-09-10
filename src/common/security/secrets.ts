const INSECURE_DEFAULTS = new Set(['', 'secret', 'password', '12345678']);

export function resolveSecret(
  name: string,
  value: string | undefined,
  fallback: string,
): string {
  const resolved = value ?? fallback;
  const production = process.env.NODE_ENV === 'production';

  if (production && INSECURE_DEFAULTS.has(resolved)) {
    throw new Error(
      `${name} must be provided via the environment or a secrets manager in production`,
    );
  }

  return resolved;
}
