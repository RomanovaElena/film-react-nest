import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

// Поддержка crypto.randomUUID в CommonJS
if (!globalThis.crypto) {
  globalThis.crypto = {} as any;
}

if (!globalThis.crypto.randomUUID) {
  const nodeCrypto = require('crypto');
  globalThis.crypto.randomUUID = () => nodeCrypto.randomUUID();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}

bootstrap();