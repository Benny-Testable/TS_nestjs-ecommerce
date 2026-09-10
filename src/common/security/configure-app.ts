import { INestApplication, ValidationPipe } from '@nestjs/common';
import { applySecurityHeaders } from './security-headers';

export function configureApp(app: INestApplication): INestApplication {
  applySecurityHeaders(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const origin = process.env.CORS_ORIGIN;
  app.enableCors({
    origin: origin ? origin.split(',').map((value) => value.trim()) : false,
    credentials: true,
  });

  return app;
}
