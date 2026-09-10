import { getEnvPath } from 'src/common/helper/env.helper';
import { resolveSecret } from 'src/common/security/secrets';
import { config } from 'dotenv';
import { resolve } from 'path';

const envFilePath: string = getEnvPath(resolve(__dirname, '..', 'common/envs'));

config({ path: envFilePath });

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'ecommercedb',
    user: process.env.DATABASE_USER || 'hassan',
    password: resolveSecret(
      'DATABASE_PASSWORD',
      process.env.DATABASE_PASSWORD,
      'password',
    ),
    entities: process.env.DATABASE_ENTITIES || 'dist/**/*.entity.{ts,js}',
    ssl: process.env.DATABASE_SSL === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
  },
  jwt: {
    secret: resolveSecret('JWT_SECRET', process.env.JWT_SECRET, 'secret'),
  },
  adminUser: {
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: resolveSecret(
      'ADMIN_PASSWORD',
      process.env.ADMIN_PASSWORD,
      '12345678',
    ),
  },
});
