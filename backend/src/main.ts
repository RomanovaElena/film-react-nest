import * as nodeCrypto from 'crypto'; // Node.js crypto
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

if (!globalThis.crypto) {
  (globalThis as any).crypto = nodeCrypto;
}

if (!(globalThis as any).crypto.randomUUID) {
  (globalThis as any).crypto.randomUUID = () => nodeCrypto.randomUUID();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
