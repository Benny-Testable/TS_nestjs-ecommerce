import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const filename = env ? `${env}.env` : 'development.env';
  const configured = resolve(dest, filename);
  const fallback = resolve(dest, 'development.env');

  return existsSync(configured) ? configured : fallback;
}
