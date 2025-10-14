if (!globalThis.crypto) {
  globalThis.crypto = require('crypto');
}
if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = () => require('crypto').randomUUID();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
